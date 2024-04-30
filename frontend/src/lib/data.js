import pb from "@/lib/pocketbase";

export async function fetchAllPapers() {
    return await pb.collection('papers').getFullList({
        sort: '-created',
        cache: 'no-store'
    });
}

export async function fetchPaper(id) {
    return await pb.collection('papers').getOne(id, { cache: 'no-store' });
}

export async function fetchAuthor(id) {
    return await pb.collection('person').getOne(id, { cache: 'no-store' });
}

export async function fetchAuthorNames(authorIds) {
    const authorNames = []

    await Promise.all(authorIds.map(async (author) => {
        const authorData = await pb.collection('person').getOne(author);
        authorNames.push(authorData.name);
    }));

    return authorNames.join(', ');
}

export async function fetchAuthors(authorIds) {
    const authorObjects = [];

    await Promise.all(authorIds.map(async (author) => {
        const authorData = await pb.collection('person').getOne(author);
        authorObjects.push({
            id: authorData.id,
            name: authorData.name
        });
    }));

    return authorObjects;
}
