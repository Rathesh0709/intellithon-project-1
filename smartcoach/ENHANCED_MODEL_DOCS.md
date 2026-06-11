# Enhanced Injury Risk Prediction Model Documentation

## Overview

The injury prediction system has been significantly enhanced to provide comprehensive risk assessment including:
- **Overall injury probability** (0-100%)
- **Specific injury type predictions** (Top 3 most likely)
- **Detailed risk factor breakdown** (5 categories)
- **Personalized prevention recommendations** (Priority-based)
- **10-point risk scoring system**

## API Response Structure

### Enhanced `/predict` Endpoint Response

```json
{
  "overall_risk": {
    "confidence": 0.6234,
    "percentage": 62.34,
    "level": "HIGH",
    "risk_score": 7,
    "description": "Risk level 7/10"
  },
  
  "injury_predictions": [
    {
      "type": "Muscle Strain",
      "probability": 0.3241,
      "percentage": 32.41,
      "description": "Overstretching or tearing of muscle fibers",
      "recovery_time": "2-6 weeks",
      "common_areas": ["Hamstring", "Quadriceps", "Calf"]
    },
    {
      "type": "Ligament Injury",
      "probability": 0.2156,
      "percentage": 21.56,
      "description": "Sprain or tear of ligaments connecting bones",
      "recovery_time": "4-12 weeks",
      "common_areas": ["Knee (ACL/MCL)", "Ankle", "Shoulder"]
    },
    {
      "type": "Tendon Injury",
      "probability": 0.1879,
      "percentage": 18.79,
      "description": "Inflammation or tear of tendons",
      "recovery_time": "3-8 weeks",
      "common_areas": ["Achilles", "Patellar", "Rotator Cuff"]
    }
  ],
  
  "risk_factors": {
    "age": {
      "score": 0.333,
      "percentage": 33.3,
      "level": "LOW",
      "description": "Player age is 25 years"
    },
    "workload": {
      "score": 0.857,
      "percentage": 85.7,
      "level": "HIGH",
      "description": "30 games, 2500 minutes played"
    },
    "injury_history": {
      "score": 0.583,
      "percentage": 58.3,
      "level": "MEDIUM",
      "description": "45 total days injured, 15 this season"
    },
    "physical_condition": {
      "score": 0.200,
      "percentage": 20.0,
      "level": "LOW",
      "description": "Physic rating: 80"
    },
    "pace_intensity": {
      "score": 0.595,
      "percentage": 59.5,
      "level": "MEDIUM",
      "description": "Pace rating: 85"
    }
  },
  
  "recommendations": [
    {
      "priority": "HIGH",
      "category": "Workload Management",
      "recommendation": "Reduce training intensity and match minutes over next 2-3 weeks"
    },
    {
      "priority": "HIGH",
      "category": "Injury Prevention",
      "recommendation": "Schedule regular physiotherapy and strengthening exercises"
    },
    {
      "priority": "MEDIUM",
      "category": "Muscle Care",
      "recommendation": "Emphasize dynamic warm-ups and proper cool-down routines"
    }
  ],
  
  "player_summary": {
    "age": 25,
    "fitness_rating": 85,
    "games_played": 30,
    "minutes_played": 2500,
    "injury_days_season": 15,
    "injury_days_career": 45
  }
}
```

## Injury Type Classification

### 6 Injury Categories

#### 1. Muscle Strain
- **Risk Factors**: High workload, high pace, injury history
- **Common in**: Fast, explosive players with heavy match schedules
- **Recovery Time**: 2-6 weeks
- **Affected Areas**: Hamstring, Quadriceps, Calf
- **Prevention**: Dynamic warm-ups, proper stretching, load management

#### 2. Ligament Injury
- **Risk Factors**: Low physic rating, workload, age
- **Common in**: Players with contact exposure, aging players
- **Recovery Time**: 4-12 weeks
- **Affected Areas**: Knee (ACL/MCL), Ankle, Shoulder
- **Prevention**: Proprioception training, strength work, balance exercises

#### 3. Tendon Injury
- **Risk Factors**: Age (primary), workload, injury history
- **Common in**: Older players, high-intensity athletes
- **Recovery Time**: 3-8 weeks
- **Affected Areas**: Achilles, Patellar, Rotator Cuff
- **Prevention**: Eccentric exercises, gradual load progression

#### 4. Joint Injury
- **Risk Factors**: Low physic, age, workload
- **Common in**: Older players, physical players
- **Recovery Time**: 4-16 weeks
- **Affected Areas**: Knee, Ankle, Hip
- **Prevention**: Joint stability work, controlled movements

#### 5. Bone Stress
- **Risk Factors**: Workload (primary), pace, low physic
- **Common in**: High-volume players, runners
- **Recovery Time**: 6-12 weeks
- **Affected Areas**: Metatarsal, Tibia, Fibula
- **Prevention**: Load monitoring, proper footwear, recovery

#### 6. Overuse Injury
- **Risk Factors**: Workload (primary), age, injury history
- **Common in**: Players with insufficient recovery
- **Recovery Time**: 2-8 weeks
- **Affected Areas**: Knee, Shin, Foot
- **Prevention**: Rest periods, recovery protocols

## Risk Factor Analysis

### 1. Age Risk
**Formula**: `(age - 20) / 15` (capped at 1.0)

- **LOW**: < 28 years
- **MEDIUM**: 28-32 years  
- **HIGH**: > 32 years

**Reasoning**: Older players have reduced recovery capacity and accumulated wear

### 2. Workload Risk
**Formula**: `(avg_minutes_per_game / 90) × (games / 35)`

- **LOW**: < 40% workload capacity
- **MEDIUM**: 40-70% workload capacity
- **HIGH**: > 70% workload capacity

**Reasoning**: High game time without adequate rest increases injury risk

### 3. Injury History Risk
**Formula**: `(total_days_injured / 180) + (season_days_injured / 45)`

- **LOW**: < 40% injury score
- **MEDIUM**: 40-70% injury score
- **HIGH**: > 70% injury score

**Reasoning**: Previous injuries increase likelihood of re-injury

### 4. Physical Condition Risk
**Formula**: `1 - (physic / 100)`

- **LOW**: Physic > 70
- **MEDIUM**: Physic 50-70
- **HIGH**: Physic < 50

**Reasoning**: Lower physical attributes mean less resilience

### 5. Pace Intensity Risk
**Formula**: `(pace / 100) × 0.7`

- **LOW**: Pace < 40
- **MEDIUM**: Pace 40-70
- **HIGH**: Pace > 70

**Reasoning**: High-speed players strain muscles more (weighted at 70%)

## Recommendation System

### Priority Levels

1. **CRITICAL** - Immediate action required
   - Triggered: Overall HIGH risk
   - Action: Immediate workload reduction

2. **HIGH** - Urgent attention needed
   - Triggered: HIGH/MEDIUM risk factors
   - Action: Medical intervention, training adjustments

3. **MEDIUM** - Preventive measures
   - Triggered: Specific injury type risks
   - Action: Targeted training, therapy

4. **LOW** - General wellness
   - Always included
   - Action: Monitoring, nutrition, recovery

### Recommendation Categories

- **Immediate Action**: Rotation, rest
- **Age Management**: Enhanced recovery protocols
- **Workload Management**: Reduced training/match time
- **Injury Prevention**: Physiotherapy, strengthening
- **Physical Training**: Strength & conditioning
- **Muscle Care**: Warm-ups, cool-downs
- **Joint Protection**: Proprioception training
- **Tendon Health**: Eccentric exercises
- **Monitoring**: Daily wellness tracking
- **Nutrition**: Diet and hydration

## Frontend Display Features

### Overall Risk Display
- Risk level badge (HIGH/LOW)
- 10-point risk score
- Percentage probability
- Animated progress bar
- Color-coded (red/green)

### Injury Type Cards
- Top 3 predictions shown
- Percentage likelihood
- Description and recovery time
- Common affected areas
- Visual progress bars

### Risk Factor Breakdown
- 5 individual factor cards
- Level indicators (HIGH/MEDIUM/LOW)
- Percentage scores
- Contextual descriptions
- Color-coded progress bars

### Recommendations List
- Priority-based ordering
- Category labels
- Color-coded by priority
- Actionable advice

### Player Summary
- Age and fitness rating
- Season statistics
- Injury history overview

## Usage Examples

### Example 1: High-Risk Veteran Player
**Input:**
- Age: 33
- Pace: 75
- Physic: 70
- Games: 38
- Minutes: 3200
- Career injuries: 180 days

**Predicted Output:**
- Overall Risk: 75% (HIGH, 8/10)
- Top Injury: Tendon Injury (35%)
- Critical Factors: Age (HIGH), Workload (HIGH)
- Recommendations: Immediate rotation, enhanced recovery

### Example 2: Low-Risk Young Player
**Input:**
- Age: 22
- Pace: 85
- Physic: 82
- Games: 25
- Minutes: 1800
- Career injuries: 15 days

**Predicted Output:**
- Overall Risk: 25% (LOW, 3/10)
- Top Injury: Muscle Strain (12%)
- Critical Factors: All LOW
- Recommendations: Continue routine, monitor workload

### Example 3: Medium-Risk Player with History
**Input:**
- Age: 27
- Pace: 80
- Physic: 75
- Games: 32
- Minutes: 2600
- Career injuries: 90 days
- Season injuries: 30 days

**Predicted Output:**
- Overall Risk: 55% (MEDIUM, 6/10)
- Top Injury: Muscle Strain (28%)
- Critical Factors: Injury History (HIGH), Workload (MEDIUM)
- Recommendations: Regular physio, load management

## API Testing

### Test with cURL
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 25,
    "height_cm": 180,
    "weight_kg": 75,
    "fifa_rating": 85,
    "pace": 85,
    "physic": 80,
    "season_minutes_played": 2500,
    "season_games_played": 30,
    "total_days_injured": 45,
    "season_days_injured": 15
  }'
```

### Test with Python
```python
import requests

url = "http://localhost:8000/predict"
data = {
    "age": 25.0,
    "height_cm": 180.0,
    "weight_kg": 75.0,
    "fifa_rating": 85.0,
    "pace": 85.0,
    "physic": 80.0,
    "season_minutes_played": 2500.0,
    "season_games_played": 30.0,
    "total_days_injured": 45.0,
    "season_days_injured": 15.0
}

response = requests.post(url, json=data)
print(response.json())
```

## Model Improvements Made

### Before (Basic Model)
- ❌ Only overall risk (HIGH/LOW)
- ❌ Single confidence score
- ❌ No injury type prediction
- ❌ No risk factor breakdown
- ❌ Generic recommendations

### After (Enhanced Model)
- ✅ Overall risk with 10-point scale
- ✅ Detailed probability percentages
- ✅ 6 injury types with predictions
- ✅ 5 risk factors analyzed individually
- ✅ Personalized priority-based recommendations
- ✅ Player summary data
- ✅ Recovery time estimates
- ✅ Affected area identification

## Performance Considerations

- **Response Time**: ~100-200ms per prediction
- **Complexity**: O(1) - constant time operations
- **Memory**: Minimal - no caching required
- **Scalability**: Can handle concurrent requests
- **Accuracy**: Rule-based + ML hybrid approach

## Future Enhancements

1. **Historical Tracking**: Store predictions over time
2. **Team Analysis**: Batch predict entire squad
3. **Seasonal Trends**: Visualize risk changes
4. **Real-time Monitoring**: WebSocket updates
5. **Export Reports**: PDF generation
6. **Comparative Analysis**: Player vs player
7. **Machine Learning**: Train on actual injury outcomes
8. **External Data**: Weather, pitch conditions
9. **Injury Prevention Plans**: Customized programs
10. **Integration**: Connect with fitness tracking devices

## Troubleshooting

### High Workload Not Showing
- Check: `season_minutes_played` and `season_games_played`
- Expected: >2500 minutes or >35 games for HIGH

### All Risks Showing LOW
- Verify input values are realistic
- Check: Age > 20, Physic < 100, valid injury days

### Injury Types All Similar
- Base probability determines overall distribution
- Higher base prob = higher individual injury probs

### Recommendations Not Specific
- Based on risk factor levels
- Need HIGH/MEDIUM factors for specific recommendations

## Support

For issues or questions:
1. Check FastAPI docs: http://localhost:8000/docs
2. Review this documentation
3. Verify input data format
4. Check console for errors
5. Ensure API server is running

---

**Version**: 2.0  
**Last Updated**: October 2025  
**Model Type**: Hybrid (ML + Rule-based)
