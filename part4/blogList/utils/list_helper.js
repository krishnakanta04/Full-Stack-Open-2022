const dummy = ( blogs ) => {
	return 1
}

const totalLikes = ( blogs ) => {
	const totalLikesSum = blogs.reduce( ( initialValue, currentObj ) => {
		return initialValue + currentObj.likes
	}, 0 )

	return totalLikesSum
}

const favoriteBlog = ( blogs ) => {
	let topBlog = {}
	const topFavorite = blogs.reduce( ( initialBlog, currentBlog ) => {
		if( initialBlog.likes < currentBlog.likes ){
			topBlog = currentBlog
		}
		return topBlog
	}, { likes : 0 } )
	return { title: topFavorite.title,
		author: topFavorite.author,
		likes: topFavorite.likes }
}

const mostBlogs = ( blogs ) => {
	const  authorCounts = blogs.reduce( ( authorCount, blog ) => {
		authorCount[blog.author] = ( authorCount[blog.author] || 0 ) + 1
		return authorCount // {<author name>: <count of blogs>, <author name>: <count of blogs>, ....}
	}, {} )

	const maxBlog = Math.max( ...Object.values( authorCounts ) )
	const blogger = Object.entries( authorCounts ).find( authorCount => authorCount[1] === maxBlog )

	return { author: blogger[0], blogs: blogger[1] } // reverse of Object.entries
}

const mostLikes = ( blogs ) => {
	const authorLikes = blogs.reduce( ( authorLike, blog ) => {
		authorLike[blog.author] = ( authorLike[blog.author] ? authorLike[blog.author] : 0 ) + blog.likes

		return authorLike
	}, {} )

	const maxLikes = Math.max( ...Object.values( authorLikes ) )
	const mostLikedAuthor = Object.entries( authorLikes ).find( authorLike => authorLike[1] === maxLikes )

	return ( {
		author: mostLikedAuthor[0],
		likes: mostLikedAuthor[1]
	} )
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}