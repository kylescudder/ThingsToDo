<script>
	import Fa from 'svelte-fa'
	const { faSignOutAlt } = require('@fortawesome/free-solid-svg-icons')

</script>
<a href="/logout" class="absolute bottom-5 text-white no-underline float-right ml-3">
	<p class="text-white">
		<Fa icon={faSignOutAlt } />
		Logout
	</p>
</a>
