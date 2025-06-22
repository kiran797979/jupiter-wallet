type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
      {description && <p className="text-lg text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}
