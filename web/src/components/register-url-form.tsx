
export function RegisterUrlForm() {
  return (
    <div className="bg-zinc-100 rounded-sm w-full h-[340px] xs:w-[380px]">
      <div className="h-full p-5">
        <div className="text-lg font-bold mb-5">Novo link</div>
        <form>
          <div className="grid grid-flow-col grid-rows-3 gap-4">
            <div className="grid gap-2">
              <label htmlFor="original-link" className="text-xs text-gray-500">LINK ORIGINAL</label>
              <div className="flex items-center rounded-lg bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300">
                <input type="text" name="original-link" id="original-link" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-md text-gray-900 placeholder:text-gray-400 focus:outline-none" placeholder="www.exemplo.com.br" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="shortened-link" className="text-xs text-gray-500">LINK ENCURTADO</label>
              <div className="flex items-center rounded-lg bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300">
                <div className="shrink-0 text-md text-gray-500 select-none">brev.ly/</div>
                <input type="text" name="shortened-link" id="shortened-link" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-sm text-gray-900 focus:outline-none" />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-indigo-700 mt-5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
            >
              Salvar link
            </button>
          </div>
        </form>
      </div>
    </div >
  )
}