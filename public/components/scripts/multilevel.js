document.addEventListener('alpine:init', () => {
    // Alpine component for dropdown
    Alpine.data('multilevel', () => ({
        isMultiOpen : false,
        pathSvg : "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z",
        items: [
            { Text: 'view profile', URL: 'https://www.Github.com' },
            { Text: 'Settings', URL: '#' },
            { Text: 'Keyboard shortcuts', URL: '#' },
            { Text: 'Company profile', URL: '#' },
            { Text: 'Team', URL: '#' },
            { Text: 'Invite colleagues', URL: '#' },
            { Text: 'Help', URL: '#' },
            { Text: 'Sign Out', URL: '#' }        
        ],
        trigger: {
            ['@click']() {
                this.isMultiOpen = ! this.isMultiOpen
            },
        },
        dialogue: {
            ['x-show']() {
                return this.isMultiOpen
            },
            ['@click.away']() {
                return this.isMultiOpen = false
            },
            ['x-transition:enter']() {
                return 'transition ease-out duration-100'
            },
            ['x-transition:enter-start']() {
                return 'opacity-0 scale-90'
            },
            ['x-transition:enter-end']() {
                return 'opacity-100 scale-100'
            },
            ['x-transition:leave']() {
                return 'transition ease-in duration-100'
            },
            ['x-transition:leave-start']() {
                return 'opacity-100 scale-100'
            },
            ['x-transition:leave-end']() {
            },
    }
}))
})
