import { login } from 'masto';

let masto;
async function getClient(url, accessToken) {
	if (masto) return masto;

	masto = await login({
		url,
		accessToken,
	});
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

export async function postToot(url, accessToken, { scheduledAt, spoilerText, status, media }) {
	const client = await getClient(url, accessToken);

	let mediaIds;
	console.log('posting', {
		scheduledAt,
		spoilerText,
		status,
		mediaIds,
		visibility: 'direct',
	});
	const posted = await client.v1.statuses.create({
		scheduled_at: scheduledAt,
		spoilerText,
		status,
		mediaIds,
		visibility: 'direct', // TODO: remove
	});
	console.log('posted', posted);
}

export async function cancelScheduledPost(url, accessToken, id) {
	const client = await getClient(url, accessToken);

	const canceled = await client.v1.scheduledStatuses.remove(id);
	console.log('canceled', canceled);
}
