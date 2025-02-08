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
  <div className="fixed bottom-20 w-68 right-0 bg-[#FEFCE8] dark:bg-gray-800 shadow-lg p-4 rounded-3xl z-50 border border-[#ADFF00]">
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
  const [isScientific, setIsScientific] = useState(false);

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

  const handleScientificOperation = (operation) => {
    const number = parseFloat(display);
    let result;

    switch (operation) {
      case 'sin':
        result = Math.sin(number * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(number * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(number * Math.PI / 180);
        break;
      case 'sqrt':
        result = Math.sqrt(number);
        break;
      case 'log':
        result = Math.log10(number);
        break;
      case 'ln':
        result = Math.log(number);
        break;
      case 'pow2':
        result = Math.pow(number, 2);
        break;
      case 'exp':
        result = Math.exp(number);
        break;
      default:
        return;
    }
    
    setDisplay(result.toString());
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
      case 'pow': result = Math.pow(firstNumber, secondNumber); break;
      default: return;
    }

    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const scientificButtons = [
    { label: 'sin', action: () => handleScientificOperation('sin') },
    { label: 'cos', action: () => handleScientificOperation('cos') },
    { label: 'tan', action: () => handleScientificOperation('tan') },
    { label: '√', action: () => handleScientificOperation('sqrt') },
    { label: 'log', action: () => handleScientificOperation('log') },
    { label: 'ln', action: () => handleScientificOperation('ln') },
    { label: 'x²', action: () => handleScientificOperation('pow2') },
    { label: 'exp', action: () => handleScientificOperation('exp') },
  ];

  return (
    <WidgetContainer title="Calculator" >
      <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl mb-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setIsScientific(!isScientific)}
            className="text-sm bg-[#ADFF00] px-2 py-1 rounded-md"
          >
            {isScientific ? 'Basic' : 'Scientific'}
          </button>
          <span className="text-2xl font-bold dark:text-white">{display}</span>
        </div>
      </div>
      
      {isScientific && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {scientificButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-[#ADFF00] transition-colors text-black dark:text-white text-sm font-medium"
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={handleClear}
          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-bold"
        >
          C
        </button>
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
        <button onClick={() => handleEqual()} className="p-3 cursor-pointer bg-[#ADFF00] rounded-full">
          =
        </button>
      </div>
    </WidgetContainer>
  );
};

const TimerWidget = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const presets = [
    { label: '1m', seconds: 60 },
    { label: '5m', seconds: 300 },
    { label: '10m', seconds: 600 },
    { label: '15m', seconds: 900 },
    { label: '30m', seconds: 1800 },
  ];

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const playAlarm = () => {
    // Create and play a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
  };

  const handlePresetClick = (seconds) => {
    setTimeLeft(seconds);
    setSelectedPreset(seconds);
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(selectedPreset || 0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <WidgetContainer title="Timer" icon={<Timer className="w-5 h-5 dark:text-white" />}>
      <div className="text-4xl font-mono text-center mb-4 dark:text-white">
        {formatTime(timeLeft)}
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset.seconds)}
            className={`p-2 rounded-full font-medium text-sm transition-colors ${
              selectedPreset === preset.seconds
                ? 'bg-[#ADFF00]'
                : 'bg-white dark:bg-gray-900 dark:text-white hover:bg-[#ADFF00]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={timeLeft === 0}
          className={`flex-1 p-3 rounded-full ${
            isRunning 
              ? 'bg-red-500 text-white' 
              : timeLeft === 0 
                ? 'bg-gray-300 dark:bg-gray-700' 
                : 'bg-[#ADFF00]'
          } font-bold transition-colors`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          disabled={!selectedPreset}
          className={`p-3 rounded-full transition-colors ${
            selectedPreset 
              ? 'bg-white dark:bg-gray-900 hover:bg-[#ADFF00]' 
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
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