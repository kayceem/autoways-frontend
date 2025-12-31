/**
 * Structured Data Component - React 19 Native
 * Renders JSON-LD structured data for SEO using React 19's native script support
 *
 * @param {Object|Array} schema - Schema.org JSON-LD object(s)
 */
const StructuredData = ({ schema }) => {
  if (!schema) return null;

  // Handle single schema or array of schemas
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((schemaItem, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItem) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
