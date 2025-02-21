import Link from "next/link";

export default function ToolCard({ title, description, href }: { title: string, description: string, href: string }) { 
  return (
		<div className="card bg-base-200 shadow-lg hover:shadow-2xl transition">
			<div className="card-body">
        <h3 className="card-title text-2xl font-semibold">{title}</h3>
				<p className="text-info">
					{description}
				</p>
				<div className="card-actions mt-4">
					<Link
						href={href}
						className="btn btn-outline btn-primary btn-sm"
					>
						Mehr erfahren
					</Link>
				</div>
			</div>
		</div>
	);
}