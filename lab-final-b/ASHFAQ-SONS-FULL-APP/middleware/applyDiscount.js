const applyDiscount = (req, res, next) => {
  const coupon = req.query.coupon || req.body.coupon || '';
  let discount = 0;
  if (coupon.toUpperCase() === 'SAVE10') {
    discount = 0.10; // 10%
  }
  res.locals.discountRate = discount;
  next();
};

module.exports = applyDiscount;