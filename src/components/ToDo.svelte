	async function successToast() {
		new Notify ({
			status: 'success',
			title: 'Notify Title',
			text: 'Notify text lorem ipsum',
			effect: 'slide',
			speed: 300,
			customClass: '',
			customIcon: '',
			showIcon: true,
			showCloseButton: true,
			autoclose: true,
			autotimeout: 3000,
			gap: 20,
			distance: 20,
			type: 1,
			position: 'right bottom'
		})
	}
