<script>
    import Dropdown from '$lib/components/Dropdown.svelte'

    let items = [
    {
        "id": "Facebook",
        "name": "Facebook",
        "selected": true,
        "count": 34,
        "liveCount": 34
    },
    {
        "id": "Instagram",
        "name": "Instagram",
        "selected": true,
        "count": 21,
        "liveCount": 21
    },
    {
        "id": "Twitter",
        "name": "Twitter",
        "selected": true,
        "count": 34,
        "liveCount": 34
    },
    {
        "id": "YouTube",
        "name": "YouTube",
        "selected": true,
        "count": 16,
        "liveCount": 16
    },
    {
        "id": "unspecified",
        "name": "unspecified",
        "selected": true,
        "count": 33,
        "liveCount": 33
    },
    {
        "id": "Reddit",
        "name": "Reddit",
        "selected": true,
        "count": 13,
        "liveCount": 13
    },
    {
        "id": "WhatsApp",
        "name": "WhatsApp",
        "selected": true,
        "count": 2,
        "liveCount": 2
    },
    {
        "id": "SMS",
        "name": "SMS",
        "selected": true,
        "count": 2,
        "liveCount": 2
    },
    {
        "id": "Telegram",
        "name": "Telegram",
        "selected": true,
        "count": 1,
        "liveCount": 1
    },
    {
        "id": "Quora",
        "name": "Quora",
        "selected": true,
        "count": 1,
        "liveCount": 1
    },
    {
        "id": "Forum Board",
        "name": "Forum Board",
        "selected": true,
        "count": 1,
        "liveCount": 1
    },
    {
        "id": "Parler",
        "name": "Parler",
        "selected": true,
        "count": 1,
        "liveCount": 1
    },
    {
        "id": "Gab",
        "name": "Gab",
        "selected": true,
        "count": 1,
        "liveCount": 1
    }
]

</script>

<Dropdown items={items} label='Platform'></Dropdown>