import React from 'react'

function ReportPage() {
  return (
    <div class="max-w-2xl mx-auto">

	<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload file</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

<button>Summerize</button>
	{/* <p class="mt-5">This file input component is part of a larger, open-source library of Tailwind CSS components. Learn
		more
		by going to the official <a class="text-blue-600 hover:underline"
			href="#" target="_blank">Flowbite Documentation</a>.
	</p> */}
  
</div>
  )
}

export default ReportPage
