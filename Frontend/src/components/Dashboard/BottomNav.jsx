import { useState, useEffect } from "react";
import { 
  Calculator,
  Timer,
  Calendar,
  Settings,
  Plus,
  Minus,
  Divide,
  RefreshCw,
  X
} from "lucide-react";

const BottomNav = () => {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg flex items-center gap-2">
        <NavButton onClick={() => handleToolClick('calculator')}>
          <Calculator className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
        <NavButton onClick={() => handleToolClick('timer')}>
          <Timer className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
        <NavButton onClick={() => handleToolClick('calendar')}>
          <Calendar className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
        <NavButton onClick={() => handleToolClick('settings')}>
          <Settings className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
      </div>

      {activeTool === 'calculator' && <CalculatorWidget />}
      {activeTool === 'timer' && <TimerWidget />}
      {activeTool === 'calendar' && <CalendarWidget />}
      {activeTool === 'settings' && <SettingsWidget />}
    </div>
  );
};

const NavButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="p-3 rounded-full hover:bg-[#ADFF00] transition-colors"
  >
    {children}
  </button>
);

const WidgetContainer = ({ title, icon, children }) => (
  <div className="fixed bottom-20 right-4 bg-[#FEFCE8] dark:bg-gray-800 shadow-lg p-4 rounded-3xl z-50 border border-[#ADFF00]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold dark:text-white">{title}</h2>
      {icon}
    </div>
    {children}
  </div>
);

const CalculatorWidget = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num.toString() : display + num);
    }
  };

  const handleOperation = (op) => {
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumber(true);
  };

  const handleEqual = () => {
    const secondNumber = parseFloat(display);
    let result;

    switch (operation) {
      case '+': result = firstNumber + secondNumber; break;
      case '-': result = firstNumber - secondNumber; break;
      case '*': result = firstNumber * secondNumber; break;
      case '/': result = firstNumber / secondNumber; break;
      default: return;
    }

    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  return (
    <WidgetContainer title="Calculator" icon={<Calculator className="w-5 h-5 dark:text-white" />}>
      <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl mb-4 text-right">
        <span className="text-2xl font-bold dark:text-white">{display}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num)}
            className="p-3 bg-white dark:bg-gray-900 rounded-full hover:bg-[#ADFF00] transition-colors text-black dark:text-white font-bold"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('+')} className="p-3 bg-[#ADFF00] rounded-full">
          <Plus className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={() => handleOperation('-')} className="p-3 bg-[#ADFF00] rounded-full">
          <Minus className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={() => handleOperation('*')} className="p-3 bg-[#ADFF00] rounded-full">
          <X className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={() => handleOperation('/')} className="p-3 bg-[#ADFF00] rounded-full">
          <Divide className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={handleEqual} className="p-3 bg-[#ADFF00] rounded-full col-span-2 font-bold">
          =
        </button>
      </div>
    </WidgetContainer>
  );
};

const TimerWidget = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <WidgetContainer title="Timer" icon={<Timer className="w-5 h-5 dark:text-white" />}>
      <div className="text-4xl font-mono text-center mb-4 dark:text-white">
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 p-3 rounded-full ${isRunning ? 'bg-red-500' : 'bg-[#ADFF00]'} font-bold transition-colors`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}
          className="p-3 bg-white dark:bg-gray-900 rounded-full hover:bg-[#ADFF00] transition-colors"
        >
          <RefreshCw className="w-4 h-4 dark:text-white" />
        </button>
      </div>
    </WidgetContainer>
  );
};

const CalendarWidget = () => {
  return (
    <WidgetContainer title="Calendar" icon={<Calendar className="w-5 h-5 dark:text-white" />}>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-center font-bold dark:text-white">
            {day}
          </div>
        ))}
        {Array(31).fill(null).map((_, i) => (
          <div key={i} className="text-center p-2 hover:bg-[#ADFF00] rounded-full cursor-pointer transition-colors dark:text-white">
            {i + 1}
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

const SettingsWidget = () => {
  return (
    <WidgetContainer title="Settings" icon={<Settings className="w-5 h-5 dark:text-white" />}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="dark:text-white">Dark Mode</span>
          <button className="w-12 h-6 bg-white dark:bg-gray-900 rounded-full relative">
            <div className="w-4 h-4 bg-[#ADFF00] rounded-full absolute left-1 top-1" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="dark:text-white">Notifications</span>
          <button className="w-12 h-6 bg-[#ADFF00] rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
          </button>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default BottomNav;