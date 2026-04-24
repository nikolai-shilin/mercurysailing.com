/**
 * Renders a JSON-LD <script> block for structured data (schema.org).
 * Helps AI search engines (Perplexity, SearchGPT, etc.) and Google
 * understand the entity type and key attributes of the page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
