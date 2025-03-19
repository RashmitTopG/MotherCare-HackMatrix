import React, { useState } from 'react';
import { Plus, Trash2, Search, Info, X } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface NutritionGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const DietPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'recommendations'>('tracker');
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [nutritionGoals] = useState<NutritionGoal>({
    calories: 2200,
    protein: 75,
    carbs: 275,
    fat: 73
  });
  
  const [mealPlan, setMealPlan] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Greek Yogurt with Berries',
      calories: 220,
      protein: 15,
      carbs: 25,
      fat: 8,
      category: 'breakfast'
    },
    {
      id: '2',
      name: 'Spinach and Feta Omelette',
      calories: 320,
      protein: 22,
      carbs: 5,
      fat: 24,
      category: 'breakfast'
    },
    {
      id: '3',
      name: 'Grilled Chicken Salad',
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 18,
      category: 'lunch'
    },
    {
      id: '4',
      name: 'Salmon with Quinoa',
      calories: 420,
      protein: 35,
      carbs: 30,
      fat: 20,
      category: 'dinner'
    },
    {
      id: '5',
      name: 'Apple with Almond Butter',
      calories: 180,
      protein: 5,
      carbs: 25,
      fat: 8,
      category: 'snack'
    }
  ]);
  
  const [newFood, setNewFood] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    category: 'breakfast'
  });
  
  const suggestedFoods: FoodItem[] = [
    {
      id: 's1',
      name: 'Avocado Toast',
      calories: 280,
      protein: 8,
      carbs: 30,
      fat: 15,
      category: 'breakfast'
    },
    {
      id: 's2',
      name: 'Lentil Soup',
      calories: 230,
      protein: 15,
      carbs: 35,
      fat: 5,
      category: 'lunch'
    },
    {
      id: 's3',
      name: 'Hummus with Carrots',
      calories: 150,
      protein: 6,
      carbs: 18,
      fat: 8,
      category: 'snack'
    }
  ];
  
  const handleAddFood = () => {
    if (newFood.name.trim() === '') return;
    
    const foodItem: FoodItem = {
      ...newFood,
      id: Date.now().toString()
    };
    
    setMealPlan([...mealPlan, foodItem]);
    setShowAddFoodModal(false);
    setNewFood({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      category: 'breakfast'
    });
  };
  
  const handleRemoveFood = (id: string) => {
    setMealPlan(mealPlan.filter(item => item.id !== id));
  };
  
  const handleAddSuggestedFood = (food: FoodItem) => {
    const foodItem: FoodItem = {
      ...food,
      id: Date.now().toString()
    };
    
    setMealPlan([...mealPlan, foodItem]);
  };
  
  // Calculate totals
  const calculateTotals = () => {
    return mealPlan.reduce(
      (acc, item) => {
        return {
          calories: acc.calories + item.calories,
          protein: acc.protein + item.protein,
          carbs: acc.carbs + item.carbs,
          fat: acc.fat + item.fat
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };
  
  const totals = calculateTotals();
  
  // Filter meals by category
  const getFilteredMeals = (category: FoodItem['category']) => {
    return mealPlan.filter(item => item.category === category);
  };
  
  return (
    <div className="space-y-6 mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Diet Planner</h1>
        <button 
          onClick={() => setShowAddFoodModal(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Food
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'tracker'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Meal Tracker
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'recommendations'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Recommendations
            </button>
          </nav>
        </div>
        
        {activeTab === 'tracker' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Daily Nutrition Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Calories</span>
                      <span>{totals.calories} / {nutritionGoals.calories} kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (totals.calories / nutritionGoals.calories) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Protein</span>
                      <span>{totals.protein}g / {nutritionGoals.protein}g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (totals.protein / nutritionGoals.protein) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carbs</span>
                      <span>{totals.carbs}g / {nutritionGoals.carbs}g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (totals.carbs / nutritionGoals.carbs) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fat</span>
                      <span>{totals.fat}g / {nutritionGoals.fat}g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (totals.fat / nutritionGoals.fat) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Pregnancy Nutrition Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Aim for 300-500 extra calories per day during the second and third trimesters
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Include foods rich in folate like leafy greens, beans, and fortified cereals
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Consume 1000mg of calcium daily from dairy products or fortified alternatives
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Stay hydrated with at least 8-10 glasses of water daily
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Include iron-rich foods like lean meats, beans, and spinach
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Breakfast</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fat</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getFilteredMeals('breakfast').map((food) => (
                        <tr key={food.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{food.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.calories} kcal</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.protein}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.carbs}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.fat}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleRemoveFood(food.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {getFilteredMeals('breakfast').length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 text-center">No breakfast items added yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Lunch</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fat</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getFilteredMeals('lunch').map((food) => (
                        <tr key={food.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{food.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.calories} kcal</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.protein}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.carbs}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.fat}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleRemoveFood(food.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {getFilteredMeals('lunch').length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 text-center">No lunch items added yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Dinner</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fat</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getFilteredMeals('dinner').map((food) => (
                        <tr key={food.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{food.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.calories} kcal</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.protein}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.carbs}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.fat}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleRemoveFood(food.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {getFilteredMeals('dinner').length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 text-center">No dinner items added yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Snacks</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fat</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getFilteredMeals('snack').map((food) => (
                        <tr key={food.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{food.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.calories} kcal</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.protein}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.carbs}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.fat}g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleRemoveFood(food.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {getFilteredMeals('snack').length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 text-center">No snack items added yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
                  placeholder="Search for foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-lg mb-6 flex items-start">
              <Info className="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                These recommendations are based on common nutritional needs during pregnancy. Always consult with your healthcare provider for personalized advice.
              </p>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-3">Recommended Foods for Pregnancy</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedFoods.map((food) => (
                <div key={food.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-800 mb-2">{food.name}</h4>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p>Calories: {food.calories} kcal</p>
                    <p>Protein: {food.protein}g</p>
                    <p>Carbs: {food.carbs}g</p>
                    <p>Fat: {food.fat}g</p>
                  </div>
                  <button
                    onClick={() => handleAddSuggestedFood(food)}
                    className="w-full bg-primary-100 text-primary-700 hover:bg-primary-200 px-3 py-1.5 rounded text-sm font-medium flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Meal Plan
                  </button>
                </div>
              ))}
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-800 mb-2">Spinach and Kale Salad</h4>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Calories: 120 kcal</p>
                  <p>Protein: 5g</p>
                  <p>Carbs: 15g</p>
                  <p>Fat: 6g</p>
                </div>
                <button
                  className="w-full bg-primary-100 text-primary-700 hover:bg-primary-200 px-3 py-1.5 rounded text-sm font-medium flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Meal Plan
                </button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-800 mb-2">Whole Grain Toast with Avocado</h4>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Calories: 240 kcal</p>
                  <p>Protein: 6g</p>
                  <p>Carbs: 28g</p>
                  <p>Fat: 12g</p>
                </div>
                <button
                  className="w-full bg-primary-100 text-primary-700 hover:bg-primary-200 px-3 py-1.5 rounded text-sm font-medium flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Meal Plan
                </button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-800 mb-2">Calcium-Rich Smoothie</h4>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Calories: 210 kcal</p>
                  <p>Protein: 10g</p>
                  <p>Carbs: 35g</p>
                  <p>Fat: 4g</p>
                </div>
                <button
                  className="w-full bg-primary-100 text-primary-700 hover:bg-primary-200 px-3 py-1.5 rounded text-sm font-medium flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Meal Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Food Modal */}
      {showAddFoodModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Food Item</h3>
              <button onClick={() => setShowAddFoodModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                  <input
                    type="text"
                    value={newFood.name}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter food name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meal Category</label>
                  <select
                    value={newFood.category}
                    onChange={(e) => setNewFood({ ...newFood, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      value={newFood.calories}
                      onChange={(e) => setNewFood({ ...newFood, calories: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                    <input
                      type="number"
                      value={newFood.protein}
                      onChange={(e) => setNewFood({ ...newFood, protein: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      value={newFood.carbs}
                      onChange={(e) => setNewFood({ ...newFood, carbs: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                    <input
                      type="number"
                      value={newFood.fat}
                      onChange={(e) => setNewFood({ ...newFood, fat: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddFoodModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFood}
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                >
                  Add Food
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanner;