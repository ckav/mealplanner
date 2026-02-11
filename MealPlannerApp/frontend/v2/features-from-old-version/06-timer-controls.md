# Feature: Timer Controls

## Description
Built-in timer functionality to help users track cooking times while preparing meals, with start/pause/reset controls and large display.

## Current Implementation (Old Version)

### HTML Structure
```html
<div class="timer-controls" id="timerControls" style="display: none;">
    <button class="btn btn-primary" onclick="startTimer()">Start Timer</button>
    <button class="btn btn-secondary" onclick="resetTimer()">Reset</button>
    <div class="timer-display" id="timerDisplay">00:00</div>
</div>
```

### JavaScript Implementation
```javascript
// State variables
let timerInterval = null;
let timerSeconds = 0;

// Start/pause timer
function startTimer() {
    const btn = event.target;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.textContent = 'Start Timer';
    } else {
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
        btn.textContent = 'Pause Timer';
    }
}

// Reset timer to zero
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    updateTimerDisplay();
    const startBtn = document.querySelector('.timer-controls .btn-primary');
    if (startBtn) {
        startBtn.textContent = 'Start Timer';
    }
}

// Update display with MM:SS format
function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
```

### CSS
```css
.timer-controls {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 8px;
}

.timer-display {
    font-size: 32px;
    font-weight: bold;
    font-family: 'Courier New', monospace;
    color: #ff6b6b;
    min-width: 100px;
    text-align: center;
}

.timer-controls button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}
```

## Features & Functionality
✅ Start/Pause toggle functionality
✅ Reset to zero
✅ MM:SS display format
✅ Auto-updates every second
✅ Button text changes on state
✅ Large, readable display
✅ Monospace font for clarity

## Use Cases
1. **General timer** - Time any cooking step
2. **Boiling water** - 5-10 minute timers
3. **Simmering** - 20-30 minute timers
4. **Resting** - Post-cooking rest times
5. **Marinating** - Multi-hour timers

## Integration Requirements for v2

### Current v2 Status
- v2 does NOT have timer controls
- Cooking view is minimal in v2
- Recipe modal is primary view (not step-by-step)

### Work Needed
- [ ] Add timer to recipe modal footer
- [ ] Create timer component module
- [ ] Add timer state to v2/app.js
- [ ] Implement start/pause/reset buttons
- [ ] Test timer display in modal
- [ ] Add keyboard shortcuts (spacebar to start/pause)

## TODO for v2 Integration
- [ ] Create timer.js module with reusable functions
- [ ] Add timer HTML to recipe modal
- [ ] Add timer buttons and display to modal footer
- [ ] Integrate timer state into v2/app.js
- [ ] Test on mobile devices
- [ ] Add audio notification when timer reaches zero
- [ ] Add preset timers (5m, 10m, 15m, 20m, 30m buttons)

## Enhanced Features to Add
1. **Preset Timers** - Quick buttons for common times
   - 5 mins, 10 mins, 15 mins, 20 mins, 30 mins
2. **Step-based Timers** - Load timing from recipe steps
   - Parse step timings and create preset
3. **Audio Alert** - Sound when timer completes
4. **Multiple Timers** - Run 2-3 timers simultaneously
   - "Boiling pasta" + "heating sauce"
5. **Tab Notifications** - Show remaining time in browser tab
6. **Countdown Display** - Alternative to elapsed time
7. **Vibration Feedback** - Mobile haptic feedback

## Proposed Enhanced Implementation

### Multiple Timer Support
```javascript
let timers = {
    main: { seconds: 0, interval: null, label: 'Main' },
    sauce: { seconds: 0, interval: null, label: 'Sauce' },
    veggies: { seconds: 0, interval: null, label: 'Veggies' }
};

function addTimer(timerName, duration) {
    timers[timerName].seconds = duration * 60;
    timers[timerName].interval = setInterval(() => {
        timers[timerName].seconds--;
        if (timers[timerName].seconds <= 0) {
            clearInterval(timers[timerName].interval);
            notifyTimerComplete(timerName);
        }
        updateTimerDisplay(timerName);
    }, 1000);
}
```

### Preset Timers UI
```html
<div class="timer-presets">
    <button onclick="startPresetTimer(5)">5m</button>
    <button onclick="startPresetTimer(10)">10m</button>
    <button onclick="startPresetTimer(15)">15m</button>
    <button onclick="startPresetTimer(20)">20m</button>
    <button onclick="startPresetTimer(30)">30m</button>
</div>
```

### Audio Notification
```javascript
function notifyTimerComplete(timerName) {
    // Create audio alert
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Visual notification
    alert(`${timerName} timer complete!`);
}
```

## UI Recommendations

### Simple (Current)
```
┌─────────────────────┐
│  Start  Reset       │
│    00:45            │
└─────────────────────┘
```

### Enhanced (Recommended)
```
┌──────────────────────────────────┐
│  [5m] [10m] [15m] [20m] [30m]    │
├──────────────────────────────────┤
│         ⏱️  02:34                 │
├──────────────────────────────────┤
│  [⏸ Pause]  [🔄 Reset]  [🔊 On]  │
└──────────────────────────────────┘
```

## Mobile Considerations
- Ensure timer remains visible while cooking
- Floating timer widget that stays on screen
- Landscape mode support
- Large touch targets for buttons
- Keep screen awake during cooking

## Keyboard Shortcuts
- **Spacebar** - Start/Pause
- **R** - Reset
- **Up Arrow** - +1 minute
- **Down Arrow** - -1 minute
- **Number Keys** - Jump to preset time

## Best Practices
1. **State Persistence** - Save timer state to sessionStorage
2. **Multiple Timers** - Support running several timers
3. **Clear Feedback** - Show active/paused state
4. **Accessibility** - Use semantic HTML, labels
5. **Battery Life** - Use requestAnimationFrame, not setInterval
6. **Performance** - Minimize DOM updates

## Performance Considerations
- Use `performance.now()` instead of `setInterval` for accuracy
- Update DOM only when seconds change (not every millisecond)
- Cancel animation frame on component unmount
- Test battery drain on long recipes

## Storage & Persistence
```javascript
// Save timer state to sessionStorage
sessionStorage.setItem('timerState', JSON.stringify({
    timerSeconds: 0,
    isRunning: false,
    lastUpdate: Date.now()
}));

// Restore on modal reopen
function restoreTimerState() {
    const saved = sessionStorage.getItem('timerState');
    if (saved) {
        const state = JSON.parse(saved);
        timerSeconds = state.timerSeconds;
    }
}
```

## Related Features
- Recipe View & Cooking (05-recipe-view-cooking.md)
- Tab Navigation (08-tab-navigation.md)

## Browser Compatibility
- Requires `setInterval` (all browsers)
- Audio context optional fallback to alert
- Vibration API optional (modern devices)
