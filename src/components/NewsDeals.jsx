export default function NewsDeals(props) {
  return (
    <div className="main-body">
      <Helmet
  title={`News & Deals | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: "Keep up to date on our website's news and deals",
    },
    { property: 'og:title', content: `News & Deals | Best of France` },
    // { property: 'og:url', content: "" },
    
  ]}
/>
    <div>
      <h2>
        News and Deals
      </h2>
    </div>
    </div>
  )
}