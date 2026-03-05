# FocusFlow - Productivity App Specification

## Project Overview

- **Name**: FocusFlow
- **Type**: Single Page Application (React + Tailwind CSS)
- **Core Functionality**: A productivity app combining Kanban task management with focus timers and analytics
- **Target Users**: Professionals seeking structured work sessions

## UI/UX Specification

### Layout Structure

- **Sidebar**: Fixed left sidebar (256px width) with navigation
- **Main Content**: Fluid content area filling remaining space
- **Overlay**: Timer overlay covering full screen when active
- **Responsive**: Sidebar collapses to icons on mobile (<768px)

### Visual Design

- **Color Palette**:
  - Primary: `#3B82F6` (Blue 500)
  - Secondary: `#1E293B` (Slate 800)
  - Accent Red: `#EF4444` (Pomodoro)
  - Accent Blue: `#3B82F6` (Kaizen)
  - Accent Green: `#22C55E` (Time Boxing)
  - Background: `#F8FAFC` (Slate 50)
  - Surface: `#FFFFFF`
- **Typography**:
  - Font Family: "Inter", system-ui, sans-serif
  - Headings: Bold (700), sizes 2xl/3xl
  - Body: Regular (400), size base
- **Spacing**: 8px base unit (Tailwind default)
- **Effects**: Subtle shadows, rounded corners (12px), smooth transitions (200ms)

### Components

#### Sidebar

- Logo/App name at top
- Navigation items: Task Board, Analytics
- Active state: Blue background highlight
- Icons: Lucide React icons

#### Task Board

- 3 columns: Pending, In Progress, Completed
- Add task form at top
- Task cards showing:
  - Title
  - Technique badge (color-coded)
  - Estimated time
  - Action buttons (Focus, Delete)

#### Timer Overlay

- Full screen dark overlay
- Large centered countdown display
- Technique color theme
- Play/Pause/Reset controls
- Current task info display

#### Analytics Dashboard

- Stats cards (Completion Rate, Tasks Completed, Total)
- Pie Chart: Technique distribution
- Bar Chart: Efficiency metrics

## Functionality Specification

### Core Features

1. **Task Management**
   - Add new tasks with title, technique, estimated time
   - Drag between columns (simplified: use buttons)
   - Delete tasks
   - Persist to localStorage

2. **Focus Timer**
   - Start timer from any pending/in-progress task
   - Technique determines timer color:
     - Pomodoro: Red theme, 25 min default
     - Kaizen: Blue theme
     - Time Boxing: Green theme
   - Play/Pause/Reset controls
   - Completion alert

3. **Analytics**
   - Calculate completion rate
   - Track tasks per technique
   - Visual charts using Recharts

### Data Handling

- State management: React Context API
- Persistence: localStorage
- Initial state: Empty array

## Acceptance Criteria

- [ ] App loads without errors
- [ ] Can add a new task
- [ ] Can move tasks between columns
- [ ] Timer starts and counts down
- [ ] Analytics charts render correctly
- [ ] Data persists on refresh
