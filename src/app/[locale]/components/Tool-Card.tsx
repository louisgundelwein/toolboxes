import { Link } from "@/i18n/navigation";


export default function ToolCard({ title, description, href }: { title: string, description: string, href: string }) { 
  const seeMoreText = "See More";
  return (
		<div className="card bg-base-200 shadow-lg hover:shadow-2xl transition">
			<div className="card-body">
				<h3 className="card-title text-2xl font-semibold">{title}</h3>
				<p className="text-info">{description}</p>
				<div className="card-actions mt-4">
					<Link href={`tools/${href}`} className="btn btn-outline btn-primary btn-sm">
						{seeMoreText}
					</Link>
				</div>
			</div>
		</div>
	);
}
