export default function BrandPage({ params }: { params: { brand: string } }) {
  const brand = params.brand;
  return <h1>{brand}</h1>;
}
