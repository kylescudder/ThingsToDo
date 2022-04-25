<script lang="ts">
	export let id: string
	export let title: string
	export let newCategory: string
	export let clickFuncion
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
	      <input
					type="text"
					bind:value={newCategory}
					class="
						form-control
						block
						w-full
						px-3
						py-1.5
						text-base
						font-normal
						text-gray-700 dark:text-white
						bg-white dark:bg-gray-500 bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-500 focus:bg-white focus:border-blue-600 focus:outline-none
					"
					id="exampleFormControlInput1"
					placeholder="Example label"
				/>
      </div>
      <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
				<button type="button" on:click={clickFuncion()} class="px-6
					py-2.5
					bg-blue-600
					text-white
					font-medium
					text-xs
					leading-tight
					uppercase
					rounded
					shadow-md
					hover:bg-blue-700 hover:shadow-lg
					focus:bg-blue-700 focus:shadow-lg 
					focus:outline-none focus:ring-0
					active:bg-blue-800 active:shadow-lg
					transition
					duration-150
					ease-in-out">Add</button>
				<button type="button" class="btnCloseModal" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>