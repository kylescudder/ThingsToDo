<script lang="ts">
	import { addCategory } from '../categories'
	
	export let id: string
	export let title: string
	export let userId: number
	export let categoryText: string
	let newCategory: string

	async function categoryAdd() {
		const btnCloseModal = document.querySelector('.btnCloseModal') as HTMLButtonElement
		if (btnCloseModal !== null) {
			btnCloseModal.click()
		}
		categoryText = newCategory
	 	await addCategory(newCategory, userId)
	}
</script>
<!-- Modal -->
<div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white dark:bg-gray-700 bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800 dark:text-white" id="exampleModalLabel">{title}</h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 hover:opacity-75"
          data-bs-dismiss="modal" aria-label="Close">
					<i class="fas fa-xmark text-lg text-black dark:text-white dark:hover:text-white hover:text-black" />
				</button>
      </div>
      <div class="modal-body relative p-4">
	      <input type="text" bind:value={newCategory} class="form-control w-full"
					id="exampleFormControlInput1" placeholder="Example label" />
      </div>
      <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
				<button type="button" on:click={() => categoryAdd()} class="btnAdd">Add</button>
				<button type="button" class="btnCloseModal" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>