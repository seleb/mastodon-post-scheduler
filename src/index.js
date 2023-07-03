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
	const media = Array.from(elMedia.querySelectorAll('li')).map(i => ({
		file: i.file,
		description: i.querySelector('textarea').value,
	}));
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
			media: fields.media,
		});
	} catch (err) {
		console.error(err);
		window.alert(`Error scheduling post: ${err.message} (see console for details)`);
	}
}

document.querySelector('#formPost').addEventListener('submit', async event => {
	event.preventDefault();

	if (event.submitter.value === 'refresh posts') {
		event.submitter.disabled = true;
		await updateScheduledPosts();
		event.submitter.disabled = false;
	} else if (event.submitter.value === 'schedule new post') {
		event.submitter.disabled = true;
		await schedulePost();
		event.submitter.disabled = false;

		elForm.querySelector('#cw').value = '';
		elForm.querySelector('#post').value = '';
		elMedia.innerHTML = '';

		await updateScheduledPosts();
	}
});

document.querySelector('#about').innerHTML = htmlReadme;
document.querySelector('#version').textContent = pkg.version;

const elMedia = document.querySelector('#listMedia');
const elFile = document.querySelector('#media');
elFile.addEventListener('change', event => {
	Array.from(event.currentTarget.files).forEach(i => {
		const elLi = document.createElement('li');
		elLi.innerHTML = `${i.name} (${i.type}) <div></div> <label>description <textarea></textarea></label> <button type="button">remove</button>`;
		elLi.file = i;
		elLi.querySelector('button').addEventListener('click', () => {
			elLi.remove();
		});
		let preview;
		if (i.type.startsWith('image')) {
			preview = document.createElement('img');
			preview.src = URL.createObjectURL(i);
		} else if (i.type.startsWith('video')) {
			preview = document.createElement('video');
			preview.src = URL.createObjectURL(i);
		} else if (i.type.startsWith('audio')) {
			preview = document.createElement('audio');
			preview.src = URL.createObjectURL(i);
		} else {
			preview = document.createElement('div');
			preview.textContent = 'no preview available';
		}
		elLi.querySelector('div').replaceWith(preview);
		elMedia.append(elLi);
	});
	elFile.value = null;
});
updateScheduledPosts();
document.querySelector('#preloader').remove();
