function ServiceCard({ title, description, accent }) {
  return (
    <article className="service-card">
      <div className="service-icon" style={{ background: accent }}>
        ✦
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default ServiceCard;
