interface Props {
  children: React.ReactNode;
}
export function LayoutScreen({ children }: Props) {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#e4e4e7] to-zinc-400 py-5 lg:py-10">
      <div className="flex min-h-[80vh] w-[95%] flex-col items-center justify-center rounded-2xl bg-neutral-50 shadow-xl shadow-black/20">
        {children}
      </div>
    </div>
  );
}
