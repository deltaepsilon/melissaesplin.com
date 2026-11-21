if (window.location.hostname === 'localhost') {
    const socket = new WebSocket('ws://localhost:3801');

    socket.onopen = function (event) {
        console.log('🤖 Hot reloading started...');
    };

    socket.onmessage = function (event) {
        location.reload();
    };

    socket.onerror = function (error) {
        console.error('WebSocket error observed:', error);
    };
}