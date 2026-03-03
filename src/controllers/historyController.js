import { Fault } from '../models/fault.js';

export const getHistoryFault = async (req, res) => {
  try {
    const { faultId } = req.params; // Предполагая, что в роуте :faultId

    // Находим неполадку и заполняем данные о пользователях в истории
    const fault = await Fault.findById(faultId)
      .select('history id_fault')
      .populate('history.userId', 'name role');

    if (!fault) {
      return res.status(404).json({ message: 'Несправність не знайдена' });
    }

    // Возвращаем только массив истории, отсортированный от новых к старым
    const history = fault.history.sort((a, b) => b.timestamp - a.timestamp);

    return res.status(200).json({
      id_fault: fault.id_fault,
      history,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Помилка при отриманні історії',
      error: error.message,
    });
  }
};
