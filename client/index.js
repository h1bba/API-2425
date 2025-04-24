import './index.css';

console.log('Hello, world!');

// view transition
document.addEventListener('navigate', () => {
    if (!document.startViewTransition) {
        return
    } else {
        document.startViewTransition(() => {
            console.log('View transition started');
        })
    }
})