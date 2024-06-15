import React from "react";

function TerminalSection() {
  return (
    <aside class='bg-black text-white p-10 ml-9 rounded-lg w-full max-w-lg font-mono'>
      <div class='flex justify-between items-center'>
        <div class='flex space-x-2 text-red-500'>
          <div class='w-3 h-3 rounded-full bg-red-500'></div>
          <div class='w-3 h-3 rounded-full bg-yellow-500'></div>
          <div class='w-3 h-3 rounded-full bg-green-500'></div>
        </div>
        <p class='text-sm'>bash</p>
      </div>
      <div class='mt-4'>
        <p class='text-green-400'>$ npm install next</p>
        <p class='text-white'>+ next@10.2.3</p>
        <p class='text-white'>added 1 package, and audited 2 packages in 3s</p>
        <p class='text-green-400'>$</p>
      </div>
    </aside>
  );
}

export default TerminalSection;
