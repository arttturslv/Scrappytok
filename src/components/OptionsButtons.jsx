export default function OptionsButtons({setFilterNet}) {
    return (
        <div className="gap-6 flex mx-auto">
            <h1 className="hover:bg-opacity-80 hover:text-2xl transition-all text-xl bg-blue-400 h-fit px-8 max-sm:px-2 py-2 cursor-pointer outline outline-8 rounded-md outline-[#241623]" onClick={() => setFilterNet('normal')}>All</h1>
            <h1 className=" hover:bg-opacity-80 hover:text-2xl transition-all text-xl bg-yellow-400 h-fit px-8 max-sm:px-2  py-2  cursor-pointer outline outline-8 rounded-md outline-[#241623]" onClick={() => setFilterNet('favorite')}>Saved</h1>
            <h1 className="hover:bg-opacity-80 hover:text-2xl transition-all text-xl bg-red-400 h-fit px-8 max-sm:px-2  py-2  cursor-pointer outline outline-8 rounded-md outline-[#241623]" onClick={() => setFilterNet('delete')}>Deleted</h1>
        </div>
    )
}