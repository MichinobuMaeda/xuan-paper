# Xuan-Paper Components Documentation

Generated on: 2025-08-13

## Components

- [Button](#button)
- [ButtonGroup](#buttongroup)
- [CheckBox](#checkbox)
- [PasswordField](#passwordfield)
- [RadioGroup](#radiogroup)
- [Slider](#slider)
- [Switch](#switch)
- [TextField](#textfield)

---

## Button

A versatile button component with multiple styles, sizes, and configurations.

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| props.id *(optional)* | `string` | Unique identifier for the button element |
| props.icon *(optional)* | `React.ReactNode` | Icon element to display alongside or instead of label |
| props.label *(optional)* | `string` | Text content to display in the button |
| props.style='filled' *(optional)* | `('filled'|'tonal'|'outlined'|'elevated'|'text'|'danger'|'error'|'embed')` | Visual style variant of the button |
| props.onClick *(optional)* | `Function` | Click event handler function |
| props.disabled=false *(optional)* | `boolean` | Whether the button is disabled |
| props.rounded='rounded-full' *(optional)* | `string` | Tailwind CSS class for border radius |
| props.size='sm' *(optional)* | `('xs'|'sm'|'md')` | Size variant of the button |
| props.width='w-fit' *(optional)* | `string` | Tailwind CSS class for button width |

### Returns

**Type:** `JSX.Element`

Rendered button component

### Examples

#### Example 1

```jsx
// Basic filled button
<Button label="Click Me" onClick={() => console.log('clicked')} />
```

#### Example 2

```jsx
// Icon button with custom styling
<Button
  icon={<SomeIcon />}
  style="outlined"
  size="md"
  rounded="rounded-lg"
/>
```

#### Example 3

```jsx
// Danger button with label
<Button
  label="Delete"
  style="danger"
  onClick={handleDelete}
  disabled={isLoading}
/>
```

---

## ButtonGroup

A button group component that renders a collection of related buttons with single or multi-selection.

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| **props.name** | `string` | Unique name identifier for the button group (used for DOM IDs) |
| props.value *(optional)* | `string|Array<string>` | Currently selected button value(s). String for single select, Array for multi-select |
| props.items *(optional)* | `Array<Object>` | Array of button configuration objects |
| props.multiSelect=false *(optional)* | `boolean` | Whether multiple buttons can be selected simultaneously |
| props.onChange *(optional)* | `Function` | Callback function called when button selection changes |
| props.disabled=false *(optional)* | `boolean` | When true, disables the input field entirely (prevents interaction) |
| props.size='sm' *(optional)* | `('xs'|'sm'|'md')` | Size variant applied to all buttons in the group |

### Returns

**Type:** `JSX.Element`

Rendered button group component

### Examples

#### Example 1

```jsx
// Basic horizontal button group (single select)
<ButtonGroup
  name="viewMode"
  value={currentView}
  items={[
    { value: 'grid', label: 'Grid View' },
    { value: 'list', label: 'List View' },
    { value: 'card', label: 'Card View' }
  ]}
  onChange={(value) => setCurrentView(value)}
/>
```

#### Example 2

```jsx
// Vertical layout button group
<ButtonGroup
  name="sidebar"
  value={activeSidebar}
  layout="vertical"
  items={[
    { value: 'files', icon: <FilesIcon />, label: 'Files' },
    { value: 'search', icon: <SearchIcon />, label: 'Search' },
    { value: 'git', icon: <GitIcon />, label: 'Source Control' }
  ]}
  onChange={setActiveSidebar}
/>
```

#### Example 3

```jsx
// Multi-select horizontal button group
<ButtonGroup
  name="filters"
  value={selectedFilters}
  multiSelect={true}
  items={[
    { value: 'new', label: 'New' },
    { value: 'popular', label: 'Popular' },
    { value: 'sale', label: 'On Sale' }
  ]}
  onChange={setSelectedFilters}
/>
```

#### Example 4

```jsx
// Icon-only buttons with custom size
<ButtonGroup
  name="tools"
  value={selectedTool}
  size="md"
  items={[
    { value: 'select', icon: <SelectIcon /> },
    { value: 'pen', icon: <PenIcon /> },
    { value: 'eraser', icon: <EraserIcon /> }
  ]}
  onChange={setSelectedTool}
/>
```

---

## CheckBox

A customizable checkbox component with label support, theming,

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| props.id *(optional)* | `string` | Unique identifier for the checkbox input element |
| **props.value** | `boolean` | Current checked state of the checkbox (controlled component) |
| props.label *(optional)* | `string` | Text label to display next to the checkbox |
| props.style *(optional)* | `string` | Visual style variant, use "danger" for error states |
| props.onChange *(optional)* | `Function` | Callback function called when checkbox state changes |
| props.disabled=false *(optional)* | `boolean` | Whether the checkbox is disabled |

### Returns

**Type:** `JSX.Element`

Rendered checkbox component

### Examples

#### Example 1

```jsx
// Basic checkbox with label
<CheckBox
  value={isChecked}
  label="Accept terms and conditions"
  onChange={(checked) => setIsChecked(checked)}
/>
```

#### Example 2

```jsx
// Checkbox with danger/error styling
<CheckBox
  id="error-checkbox"
  value={hasError}
  label="This has an error"
  style="danger"
  onChange={setHasError}
/>
```

#### Example 3

```jsx
// Disabled checkbox
<CheckBox
  value={readOnlyValue}
  label="Read-only option"
  disabled={true}
  onChange={() => {}} // No-op for disabled state
/>
```

#### Example 4

```jsx
// Checkbox without label (icon only)
<CheckBox
  id="standalone-checkbox"
  value={isSelected}
  onChange={handleSelection}
/>
```

---

## PasswordField

A specialized password input field with visibility toggle functionality.

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| props.id *(optional)* | `string` | Unique identifier for the password input element |
| props.value='' *(optional)* | `string` | Current value of the password field |
| props.label *(optional)* | `string` | Floating label text that appears above the input when focused or filled |
| props.message *(optional)* | `string` | Helper text displayed below the input field |
| props.error *(optional)* | `string` | Error message that overrides helper text and applies error styling |
| props.style *(optional)* | `string` | Visual style variant, use "filled" for filled background style |
| props.width='w-48' *(optional)* | `string` | Tailwind CSS width class for the input field |
| props.fontFamily='font-mono' *(optional)* | `string` | Tailwind CSS font family class (monospace by default for passwords) |
| props.onChange *(optional)* | `Function` | Callback function called when password value changes |

### Returns

**Type:** `JSX.Element`

Rendered password field component with visibility toggle

### Examples

#### Example 1

```jsx
// Basic password field
<PasswordField
  label="Password"
  value={password}
  onChange={(value) => setPassword(value)}
/>
```

#### Example 2

```jsx
// Password field with validation and custom width
<PasswordField
  id="user-password"
  label="Enter Password"
  value={password}
  error={passwordError}
  message="Must be at least 8 characters"
  width="w-80"
  onChange={setPassword}
/>
```

#### Example 3

```jsx
// Filled style password field
<PasswordField
  label="Confirm Password"
  value={confirmPassword}
  style="filled"
  fontFamily="font-sans"
  onChange={setConfirmPassword}
/>
```

#### Example 4

```jsx
// Password field in registration form
<PasswordField
  id="new-password"
  label="Create Password"
  value={newPassword}
  error={validationError}
  width="w-full"
  onChange={handlePasswordChange}
/>
```

---

## RadioGroup

A radio button group component that allows single selection

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| **props.name** | `string` | Unique name for the radio group (required for proper radio button grouping) |
| props.value *(optional)* | `string` | Currently selected radio button value |
| props.items *(optional)* | `Array<Object>` | Array of radio button option objects |
| props.onChange *(optional)* | `Function` | Callback function called when a radio button is selected |
| props.layout='horizontal' *(optional)* | `('vertical'|'horizontal')` | Layout direction for the radio buttons |

### Returns

**Type:** `JSX.Element`

Rendered radio group component (React Fragment containing radio buttons)

### Examples

#### Example 1

```jsx
// Basic radio group for size selection
<RadioGroup
  name="size"
  value={selectedSize}
  items={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]}
  onChange={(value) => setSelectedSize(value)}
/>
```

#### Example 2

```jsx
// Radio group for theme preferences
<RadioGroup
  name="theme"
  value={currentTheme}
  items={[
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'auto', label: 'System Default' }
  ]}
  onChange={handleThemeChange}
/>
```

#### Example 3

```jsx
// Radio group for payment methods with Horizontal layout for compact display
<RadioGroup
  name="payment"
  value={paymentMethod}
  layout="horizontal"
  items={[
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' }
  ]}
  onChange={setPaymentMethod}
/>
```

---

## Slider

An interactive slider component with drag functionality and responsive design.

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| props.id *(optional)* | `string` | Unique identifier for the slider element (auto-generated if not provided) |
| props.value=0 *(optional)* | `number` | Current value of the slider. For continuous mode (count=1): 0-1 range. For discrete mode: 0 to count |
| props.count=1 *(optional)* | `number` | Number of discrete steps. Use 1 for continuous slider, >1 for stepped slider |
| props.size='xs' *(optional)* | `('xs'|'sm'|'md')` | Visual size variant affecting track height and thumb size |
| props.width='w-48' *(optional)* | `string` | Tailwind CSS width class for the slider container |
| props.onChange *(optional)* | `Function` | Callback function called when slider value changes |

### Returns

**Type:** `JSX.Element`

Rendered interactive slider component

### Examples

#### Example 1

```jsx
// Continuous slider (0-1 range)
<Slider
  value={volume}
  onChange={(newValue) => setVolume(newValue)}
  width="w-64"
  size="sm"
/>
```

#### Example 2

```jsx
// Discrete step slider (0-10 range)
<Slider
  id="rating-slider"
  value={rating}
  count={10}
  onChange={(newRating) => setRating(newRating)}
  size="md"
  width="w-80"
/>
```

#### Example 3

```jsx
// Progress indicator (read-only)
<Slider
  value={downloadProgress}
  size="xs"
  width="w-full"
  // No onChange = read-only mode
/>
```

#### Example 4

```jsx
// Temperature control with custom sizing
<Slider
  id="temperature"
  value={currentTemp}
  count={100}
  size="md"
  width="w-96"
  onChange={(temp) => {
    setCurrentTemp(temp);
    adjustTemperature(temp);
  }}
/>
```

---

## Switch

A toggle switch component that provides an intuitive on/off control interface.

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| props.id *(optional)* | `string` | Unique identifier for the switch input element |
| **props.value** | `boolean` | Current state of the switch (true for on/enabled, false for off/disabled) |
| props.onChange *(optional)* | `Function` | Callback function called when switch state changes |
| props.disabled=false *(optional)* | `boolean` | Whether the switch is disabled and non-interactive |

### Returns

**Type:** `JSX.Element`

Rendered switch component

### Examples

#### Example 1

```jsx
// Basic switch for notifications
<Switch
  id="notifications"
  value={notificationsEnabled}
  onChange={(enabled) => setNotificationsEnabled(enabled)}
/>
```

#### Example 2

```jsx
// Switch with disabled state
<Switch
  id="premium-feature"
  value={premiumEnabled}
  onChange={setPremiumEnabled}
  disabled={!isPremiumUser}
/>
```

#### Example 3

```jsx
// Dark mode toggle switch
<Switch
  id="dark-mode"
  value={isDarkMode}
  onChange={(enabled) => {
    setIsDarkMode(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }}
/>
```

#### Example 4

```jsx
// Auto-save setting switch
<Switch
  id="auto-save"
  value={autoSaveEnabled}
  onChange={handleAutoSaveToggle}
/>
```

---

## TextField

A versatile text input field component with floating labels,

### Props

| Name | Type | Description |
|------|------|-------------|
| **props** | `Object` | The props object |
| props.id *(optional)* | `string` | Unique identifier for the input element |
| props.type='text' *(optional)* | `('text'|'email'|'password'|'number')` | HTML input type |
| props.value *(optional)* | `string|number` | Current value of the input field |
| props.label *(optional)* | `string` | Floating label text that appears above the input when focused or filled |
| props.message *(optional)* | `string` | Helper text displayed below the input field |
| props.error *(optional)* | `string` | Error message that overrides the helper text and applies error styling |
| props.prefix *(optional)* | `React.ReactNode` | Element to display at the start of the input. Typically uses Button component with style="embed" for interactive elements |
| props.suffix *(optional)* | `React.ReactNode` | Element to display at the end of the input. Typically uses Button component with style="embed" for interactive elements |
| props.style *(optional)* | `string` | Visual style variant, use "filled" for filled background style |
| props.width='w-48' *(optional)* | `string` | Tailwind CSS width class for the input field |
| props.fontFamily='font-sans' *(optional)* | `string` | Tailwind CSS font family class |
| props.onChange *(optional)* | `Function` | Callback function called when input value changes |
| props.readonly=false *(optional)* | `boolean` | When true, makes the input read-only (allows selection but prevents editing) |
| props.disabled=false *(optional)* | `boolean` | When true, disables the input field entirely (prevents interaction) |

### Returns

**Type:** `JSX.Element`

Rendered text field component

### Examples

#### Example 1

```jsx
// Basic text input with floating label
<TextField
  id="username"
  label="Username"
  value={username}
  onChange={(value) => setUsername(value)}
/>
```

#### Example 2

```jsx
// Email input with validation and helper text
<TextField
  id="email"
  type="email"
  label="Email Address"
  value={email}
  message="We'll never share your email"
  error={emailError}
  onChange={setEmail}
/>
```

#### Example 3

```jsx
// Password field with embed button prefix
<TextField
  id="password"
  type="password"
  label="Password"
  value={password}
  prefix={<Button icon={<LockIcon />} style="embed" />}
  width="w-80"
  onChange={setPassword}
/>
```

#### Example 4

```jsx
// Filled style input with embed button suffix
<TextField
  id="search"
  label="Search products"
  value={searchQuery}
  style="filled"
  suffix={<Button icon={<SearchIcon />} style="embed" onClick={handleSearch} />}
  width="w-96"
  onChange={setSearchQuery}
/>
```

#### Example 5

```jsx
// Number input for currency with prefix/suffix
<TextField
  id="price"
  type="number"
  label="Price"
  value={price}
  prefix="$"
  suffix=".00"
  error={priceError}
  onChange={setPrice}
/>
```

---

