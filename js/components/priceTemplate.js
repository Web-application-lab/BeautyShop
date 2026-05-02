export function priceTemplate(product) {
  if (product.discount > 0) {
    const newPrice = product.price - product.price * product.discount / 100;

    return `
      <p class="product-price">
        <span class="new-price">${newPrice.toLocaleString()}₮</span>
        <span class="old-price">${product.price.toLocaleString()}₮</span>
      </p>
    `;
  }

  return `
    <p class="product-price">
      ${product.price.toLocaleString()}₮
    </p>
  `;
}