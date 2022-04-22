<script lang="ts">
	import checklistLogo from '../images/checklist.png'
	import { onMount } from 'svelte'
	//import dayjs from 'dayjs'
	const apiBaseUrl = import.meta.env.VITE_API_URL;
	export let userId: number;
  let todos: Array<{
    text: String;
    targetDate: Date;
    targetDateString: string;
    completed: boolean;
    id: number;
    categorieId: number;
  }> = [];
	let categorie: Array<{
    id: number;
    text: string;
  }> = [];
  //let selected: number;

	onMount(() => {
		categoryPopulate()
	})

	//async function getToDo() {
  //  const response = await fetch(`${apiBaseUrl}/todo`, {
  //    headers: {
  //      authorization: `Bearer ${accessToken}`,
  //    },
  //  });
  //  const payload = await response.json();
  //  todos = payload.data;
  //  //todos.forEach(todo => {
  //  //  todo.targetDateString = dayjs(todo.targetDate).format('DD/MM/YYYY HH:mm')
  //  //});
  //  categoryPopulate();
  //  return todos;
  //}
  async function categoryPopulate() {
    const categorieResponse = await fetch(`${apiBaseUrl}/categories`, {
			method: "POST",
      body: JSON.stringify({
        githubId: userId,
      }),
			headers: {
        "content-type": "application/json",
      },
    });
    const categoriePayload = await categorieResponse.json();
    categorie = categoriePayload.payload;
    //selected = categorie[0].id;
    //setTimeout(function () {
    //  hideEmptyCategories();
    //}, 100);
  }
	//function hideEmptyCategories() {
  //  var arr = Array.from(document.getElementsByClassName("card"));
  //  for (let i = 0; i < arr.length; i++) {
  //    const element = arr[i];
  //    const lists = element.children[1];
  //    if (lists.childElementCount == 0) {
  //      element.removeAttribute("style");
  //      element.setAttribute("style", "display: none;");
  //    } else {
  //      element.removeAttribute("style");
  //    }
  //  }
  //}
	//function workspaceHide(event) {
  //  let target = event.target
  //  if (event.target.localName === 'i') {
  //    target = event.target.parentElement
  //  }

  //  if (target.nextElementSibling.style.maxHeight) {
  //    target.nextElementSibling.style.maxHeight = null;
  //    target.lastElementChild.classList.remove("expandedIcon");
  //  } else {
  //    target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px";
  //    target.lastElementChild.classList.add("expandedIcon");
  //  }
  //}
</script>
<div class="col-span-2 bg-blue-500 h-full dark:bg-gray-300">
	<div class="ml-3">
		<div class="grid grid-cols-4 mt-4">
			<img class="h-8 w-auto col-span-1" src={checklistLogo} alt="Checklist Logo">	
			<p class="text-lg text-white dark:text-gray-900 text-center col-span-3">ThingsToDo</p>
		</div>
		<section class="mt-4">
      <p class="mt-4 text-lg font-bold">Categories</p>
			{#each categorie as categories (categories.id)}
				<!--<article class="my-4 text-white dark:text-gray-900 cursor-pointer categoryHeader"
					on:click={(event) => workspaceHide(event)}>
					<i class="fa-solid fa-book"></i>
					{workspace.name}
					  <i class="fa-solid fa-chevron-right float-right mr-4"></i>
				</article>-->
				<h2 on:click={(event) => console.log('test')} class="categoryHeader m-2 w-auto">
      {categories.text}
      <!--<i class="fa-solid fa-arrow-right pl-2"></i>-->
    </h2>
			{/each}
		</section>
		<a href="/logout" class="absolute bottom-5 text-white dark:text-gray-900 no-underline float-right">
			<span>
				<!-- Heroicon name: solid/lock-closed -->
				<i class="fa-solid fa-sign-out-alt text-white dark:text-gray-900" />
			</span>
				Logout
		</a>
	</div>
</div>