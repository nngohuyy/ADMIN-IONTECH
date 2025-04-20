import Image from "next/image";

export default function NoResultsFound() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/no_results_found.svg"
        alt="Next.js logo"
        width={320}
        height={320}
        priority
      />
      <p>Không tìm thấy kết quả phù hợp</p>
    </div>
  )
}