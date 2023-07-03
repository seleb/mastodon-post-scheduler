import { html as htmlReadme } from '../README.md';
import pkg from '../package.json';
import { cancelScheduledPost, getScheduledPosts, postToot } from './mastodon';

const elForm = document.querySelector('#formPost');

function getFields() {
	const formData = new FormData(elForm);
	const instance = formData.get('instance');
	const token = formData.get('token');
	let scheduledAt = formData.get('scheduledAt');
	try {
		scheduledAt = new Date(scheduledAt).toISOString();
	} catch {
		scheduledAt = null;
	}
	const cw = formData.get('cw');
	const post = formData.get('post');
	let media = formData.get('media');
	if (!media.length) media = [media];
	media = media.filter(i => i?.size);
	return {
		instance,
		token,
		scheduledAt,
		cw,
		post,
		media,
	};
}

const elScheduledPosts = document.querySelector('#scheduledPosts');

async function onCancel(event) {
	try {
		const id = event.currentTarget.value;
		const fields = getFields();
		await cancelScheduledPost(fields.instance, fields.token, id);
		await updateScheduledPosts();
	} catch (err) {
		console.error(err);
		window.alert(`Error canceling post: ${err.message} (see console for details)`);
	}
}

async function updateScheduledPosts() {
	const fields = getFields();
	if (fields.instance && fields.token) {
		try {
			elScheduledPosts.innerHTML = '<li>loading...</li>';
			const posts = await getScheduledPosts(fields.instance, fields.token);
			if (!posts.length) {
				elScheduledPosts.innerHTML = `<li>No scheduled posts</li>`;
				return;
			}

			// sort by scheduled date instead of id
			posts.sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

			elScheduledPosts.innerHTML = posts
				.map(i => {
					const date = new Date(i.scheduledAt);
					return `
				<li>
					<time datetime=${date.toISOString()}>${date.toString()}</time>
					${i.params.spoilerText ? `<details><summary>${i.params.spoilerText}</summary>${i.params.text}</details>` : `<div>${i.params.text}</div>`}
					
					${
						i.mediaAttachments.length
							? `<ul>
						${i.mediaAttachments.map(m => `<li>${m}</li>`).join('\n')}
					</ul>`
							: ''
					}
					<button value=${i.id} type="button">cancel</button>
				</li>`;
				})
				.join('\n');
			elScheduledPosts.querySelectorAll('button').forEach(b => {
				b.addEventListener('click', onCancel);
			});
		} catch (err) {
			console.error(err);
			elScheduledPosts.innerHTML = `<li>Error fetching posts: ${err.message} (see console for details)</li>`;
		}
	} else {
		elScheduledPosts.innerHTML = '<li>Instance + access token required to fetch posts</li>';
	}
}

async function schedulePost() {
	try {
		const fields = getFields();

		if (!fields.scheduledAt) throw new Error('No scheduled date set');

		await postToot(fields.instance, fields.token, {
			scheduledAt: fields.scheduledAt,
			spoilerText: fields.cw,
			status: fields.post,
			media: [],
		});
	} catch (err) {
		console.error(err);
		window.alert(`Error scheduling post: ${err.message} (see console for details)`);
	}
}

document.querySelector('#formPost').addEventListener('submit', async event => {
	event.preventDefault();

	if (event.submitter.value === 'refresh posts') {
		await updateScheduledPosts();
	} else if (event.submitter.value === 'schedule new post') {
		await schedulePost();
		await updateScheduledPosts();
	}
});

document.querySelector('#about').innerHTML = htmlReadme;
document.querySelector('#version').textContent = pkg.version;
updateScheduledPosts();
document.querySelector('#preloader').remove();
