export const getAllImages = (user, success, error) => {
  $.ajax({
    url: `images/${user}`,
    method: "GET",
    success: success || console.log,
    error: error || console.log,
  })
}
export const postImage = (image, success, error) => {
  $.ajax({
    url: `images`,
    method: "POST",
    data: image,
    success: success || console.log,
    error: error || console.log,
  })
}
