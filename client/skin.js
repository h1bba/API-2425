// https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem

// const wishlistKey = 'skinWishlist';
// const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

// function updateWishlist(skin) {
//     const alreadyExists = wishlist.find(item => item.name === skin.name);
//     if (!alreadyExists) {
//         wishlist.push(skin);
//         localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
//         document.getElementById('wishlist-confirmation').style.display = 'block';
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const button = document.getElementById('wishlist-button');
//     if (!button) return;

//     button.addEventListener('click', () => {
//         const skin = {
//             name: button.dataset.name,
//             image: button.dataset.image
//         };
//         updateWishlist(skin);
//     });
// });
