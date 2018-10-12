import Redeem from '../models/redeemcodes'
import handleError from '../utils/handleError'

export const getRedeemCodeById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Redeem
      .where('id', id)
      .fetch();
    return res.status(200).json(data)
  } catch (error) {
    return handleError(res, error)
  }
};