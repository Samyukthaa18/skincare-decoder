const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { sendScheduleEmail } = require('../utils/email');
const Schedule = require('../models/Schedule'); 

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let schedule = await Schedule.findOne({ userId: user._id });
    
   
    if (!schedule) {
      const scheduleData = generateSchedule(user);
      schedule = new Schedule({
        userId: user._id,
        morning: scheduleData.schedule.morning,
        evening: scheduleData.schedule.evening,
        cycleDay: scheduleData.currentDay,
        cycleStartDate: new Date()
      });
      await schedule.save();
    }

   
    res.json({
      schedule: {
        morning: schedule.morning,
        evening: schedule.evening
      },
      currentDay: schedule.cycleDay
    });
  } catch (err) {
    console.error('Schedule fetch error:', err.message);
    res.status(500).send('Server Error');
  }
});
// Skin cycling configuration
const CYCLE_LENGTH = 4; 

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const schedule = await Schedule.findOne({ userId: user._id });
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/email', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { schedule } = generateSchedule(user);
    
   
    const emailContent = `Your Skincare Cycle:\n\n${formatSchedule(schedule)}`;
    
    await sendScheduleEmail(user.email, emailContent);
    res.json({ msg: 'Schedule emailed successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

const generateSchedule = (user) => {
  const startDate = user.cycleStartDate || new Date();
  const daysSinceStart = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
  const currentDay = (daysSinceStart % CYCLE_LENGTH) + 1;

  const baseProducts = getBaseProducts(user.skinType);
  const cycleProducts = getCycleProducts(user.skinType);

  return {
    schedule: {
      morning: baseProducts.morning,
      evening: getEveningRoutine(currentDay, cycleProducts)
    },
    currentDay
  };
};

const getEveningRoutine = (currentDay, products) => {
  switch(currentDay) {
    case 1: return products.exfoliation;
    case 2: return products.retinol;
    case 3:
    case 4: return products.recovery;
    default: return products.recovery;
  }
};

const getBaseProducts = (skinType) => {
  // Morning routine remains consistent
  const routines = {
    Oily: {
      morning: [
        'Oil-free cleanser',
        'Alcohol-free toner',
        'Niacinamide serum',
        'Oil-free moisturizer with SPF 30+'
      ]
    },
    Dry: {
      morning: [
        'Creamy cleanser',
        'Hydrating toner',
        'Hyaluronic acid serum',
        'Rich moisturizer with SPF 30+'
      ]
    },
  

    default: {
      morning: [
        'Gentle cleanser',
        'Balancing toner',
        'Antioxidant serum',
        'Moisturizer with SPF 30+'
      ]
    }
  };

  return routines[skinType] || routines.default;
};

const getCycleProducts = (skinType) => {
  const products = {
    exfoliation: {
      Oily: [
        'BHA exfoliant (2% salicylic acid)',
        'Soothing serum',
        'Lightweight moisturizer'
      ],
      Dry: [
        'PHA exfoliant',
        'Hydrating serum',
        'Rich moisturizer'
      ],
      Sensitive: [
        'Enzyme exfoliant',
        'Calming serum',
        'Barrier repair cream'
      ],
      default: [
        'Gentle exfoliant',
        'Hydrating serum',
        'Moisturizer'
      ]
    },
    retinol: {
      Oily: [
        'Retinol serum (0.3%)',
        'Niacinamide booster',
        'Oil-free moisturizer'
      ],
      Dry: [
        'Retinol cream (0.2%)',
        'Hyaluronic acid serum',
        'Occlusive moisturizer'
      ],
      default: [
        'Retinol product',
        'Soothing serum',
        'Moisturizer'
      ]
    },
    recovery: {
      Oily: [
        'Hydrating serum',
        'Ceramide moisturizer',
        'Spot treatment (if needed)'
      ],
      Dry: [
        'Hyaluronic acid serum',
        'Facial oil',
        'Rich night cream'
      ],
      default: [
        'Repair serum',
        'Moisturizer',
        'Sleeping mask (optional)'
      ]
    }
  };

  return {
    exfoliation: products.exfoliation[skinType] || products.exfoliation.default,
    retinol: products.retinol[skinType] || products.retinol.default,
    recovery: products.recovery[skinType] || products.recovery.default
  };
};

const formatSchedule = (schedule) => {
  return `Morning Routine:\n- ${schedule.morning.join('\n- ')}\n\n` +
    `Evening Routine (Day 1-4 Cycle):\n` +
    `1. Exfoliation Night:\n- ${schedule.cycle.exfoliation.join('\n- ')}\n` +
    `2. Retinol Night:\n- ${schedule.cycle.retinol.join('\n- ')}\n` +
    `3-4. Recovery Nights:\n- ${schedule.cycle.recovery.join('\n- ')}`;
};

module.exports = router;