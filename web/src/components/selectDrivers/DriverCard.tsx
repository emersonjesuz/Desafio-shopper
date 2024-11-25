export function DriverCard() {
  return (
    <article className="bg-zinc-10 flex h-[100px] items-center justify-center gap-1 border-b border-gray-200 bg-zinc-100 px-2 py-2 shadow-sm shadow-black/10 lg:w-[500px] lg:justify-around">
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <h1 className="font-bold capitalize">paulo souza</h1>
          <p className="text-[13px] text-zinc-600">
            5/5 -<span className="text-[10px] text-zinc-600">Muito bom!</span>
          </p>
        </div>
        <p className="text-[10px] lg:max-w-[300px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          mollitia porro, soluta magnam non id hic aperiam,
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-zinc-600">100$</p>
        <button className="h-10 rounded-lg bg-zinc-900 px-3 text-[12px] text-white lg:w-[100px]">
          Escolher
        </button>
      </div>
    </article>
  );
}
