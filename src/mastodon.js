import { createRestAPIClient } from 'masto';

/** @type {ReturnType<createRestAPIClient>} */
let masto;
let hash = '';
async function getClient(url, accessToken) {
	const newHash = `${url}:${accessToken}`;
	if (masto && hash === newHash) return masto;

	masto = await createRestAPIClient({
		url,
		accessToken,
	});
	hash = newHash;
	return masto;
}

export async function getScheduledPosts(url, accessToken) {
	const client = await getClient(url, accessToken);
	const statuses = await client.v1.scheduledStatuses.list({
		limit: 500,
	});
	console.log(statuses);
	return statuses;
}

export async function postToot(url, accessToken, { scheduledAt, spoilerText, status, visibility, media, inReplyToId }) {
	const client = await getClient(url, accessToken);

	let mediaIds;
	if (media?.length) {
		console.log('uploading media');
		mediaIds = [];
		await media.reduce(async (acc, i) => {
			await acc;
			console.log(i);
			const attachment = await client.v2.media.create({
				file: i.file,
				description: i.description,
			});
			mediaIds.push(attachment.id);
			console.log('uploaded media', attachment);
			return acc;
		}, Promise.resolve());
	}

	console.log('posting', {
		scheduledAt,
		spoilerText,
		status,
		visibility,
		mediaIds,
	});
	const posted = await client.v1.statuses.create({
		scheduled_at: scheduledAt,
		spoilerText,
		status,
		visibility,
		mediaIds,
		inReplyToId,
	});
	console.log('posted', posted);
}

export async function cancelScheduledPost(url, accessToken, id) {
	const client = await getClient(url, accessToken);

	const canceled = await client.v1.scheduledStatuses.$select(id).remove();
	console.log('canceled', canceled);
}
