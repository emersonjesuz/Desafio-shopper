interface Props {
  children: React.ReactNode;
}
export function LayoutScreen({ children }: Props) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#e4e4e7] to-zinc-400">
      <div className="flex h-[95%] w-11/12 items-center justify-center rounded-2xl bg-neutral-50 shadow-xl shadow-black/20">
        {children}
      </div>
    </div>
  );
}
