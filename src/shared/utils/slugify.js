import slugify from 'slugify';

export default function slugifyName(name) {
    return slugify(name, { lower: true, strict: true, });
}