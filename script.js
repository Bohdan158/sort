document.getElementById('generate-numbers').addEventListener('click', () => {
    const inputField = document.getElementById('input-numbers');
    const numCount = 1000; // Number of random numbers to generate
    const maxNumber = 10000; // Maximum value for random numbers
    const numbers = Array.from({ length: numCount }, () => Math.floor(Math.random() * maxNumber));
    inputField.value = numbers.join(', ');
});

document.getElementById('start-sorting').addEventListener('click', () => {
    const inputField = document.getElementById('input-numbers');
    const outputField = document.getElementById('sorted-numbers');
    const timeField = document.getElementById('time-taken');

    const input = inputField.value;
    if (!input.trim()) {
        alert('Please generate or enter numbers to sort.');
        return;
    }

    const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    if (numbers.length === 0) {
        alert('No valid numbers found.');
        return;
    }

    const startTime = performance.now();

    // Balanced Multiway Merge Sort logic
    function mergeSort(array) {
        if (array.length <= 1) return array;
        const mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));
        return merge(left, right);
    }

    function merge(left, right) {
        let result = [], l = 0, r = 0;
        while (l < left.length && r < right.length) {
            if (left[l] < right[r]) {
                result.push(left[l++]);
            } else {
                result.push(right[r++]);
            }
        }
        return result.concat(left.slice(l)).concat(right.slice(r));
    }

    const sortedNumbers = mergeSort(numbers);
    const endTime = performance.now();

    outputField.textContent = sortedNumbers.join(', ');
    timeField.textContent = `Time taken: ${(endTime - startTime).toFixed(2)} ms`;
});
