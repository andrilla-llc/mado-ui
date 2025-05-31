/**
 * ### Has Class
 * - Returns a boolean based on whether the specified element has the specified class
 * @param {HTMLElement} element Any HTML Element
 * @param {string} className A string of any class to check for
 * @returns {boolean} true if the specified element has the specified class, else false
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className)
}

/**
 * ### Add Class
 * - Adds the specified classes to the specified elements
 * @param {Element|HTMLElement|HTMLElement[]|NodeList|string|undefined} elements An HTML Element, an array of HTML Elements, a Node List, a string (as a selector for a querySelector)
 * @param {string|string[]} classList A string or an array of classes to add to each element
 */
export function addClass(
  elements: Element | HTMLElement | HTMLElement[] | NodeList | string,
  classList: string | string[],
) {
  const elementsType = elements.constructor.name,
    elementsIsString = typeof elements === 'string',
    classListType = classList.constructor.name,
    classListIsString = typeof classList === 'string'

  let elementList: HTMLElement[] | undefined,
    classListGroup: string[] | undefined

  // & Convert elements to array
  switch (elementsType) {
    // Selector
    case 'String':
      if (elementsIsString)
        elementList = Array.from(document.querySelectorAll(elements))
      break
    // Multiple HTML Elements
    case 'NodeList':
      if (!elementsIsString)
        elementList = Array.from(elements as NodeList) as HTMLElement[]
      break
    // Array of Elements
    case 'Array':
      if (!elementsIsString) elementList = elements as HTMLElement[]
      break
    // Single HTML Element
    default:
      if (elementsType.startsWith('HTML') && !elementsIsString)
        elementList = [elements as Element & HTMLElement]
  }

  // & Convert classList to array
  switch (classListType) {
    case 'String':
      if (classListIsString)
        if (classList.split(' ').length >= 2) {
          classListGroup = classList.split(' ')
        } else {
          classListGroup = [classList]
        }
      break
    case 'Array':
      if (!classListIsString) classListGroup = classList
      break
  }

  if (!elementList || elementList.length < 1)
    throw new Error(
      `Elements are invalid or undefined. elements: ${elements} → elementList: ${elementList}`,
    )

  if (!classListGroup || classListGroup.length < 1)
    throw new Error(
      `Class List is invalid or undefined. classList: ${classList} → classListGroup: ${classListGroup}`,
    )

  elementList.forEach((element) =>
    classListGroup.forEach((classItem) => {
      if (hasClass(element, classItem)) return
      element.classList.add(classItem)
    }),
  )
}

/**
 * ### Remove Class
 * - Removes the specified classes from the specified elements
 * @param {HTMLElement|HTMLElement[]|NodeList|string|undefined} elements An HTML Element, an array of HTML Elements, a Node List, a string (as a selector for a querySelector)
 * @param {string|string[]} classList A string or an array of classes to remove from each element
 */
export function removeClass(
  elements: HTMLElement | HTMLElement[] | NodeList | string,
  classList: string | string[],
) {
  const elementsType = elements.constructor.name,
    elementsIsString = typeof elements === 'string',
    classListType = classList.constructor.name,
    classListIsString = typeof classList === 'string'

  let elementList: HTMLElement[] | undefined,
    classListGroup: string[] | undefined

  // & Convert elements to array
  switch (elementsType) {
    // Selector
    case 'String':
      if (elementsIsString)
        elementList = Array.from(document.querySelectorAll(elements))
      break
    // Multiple HTML Elements
    case 'NodeList':
      if (!elementsIsString)
        elementList = Array.from(elements as NodeList) as HTMLElement[]
      break
    // Array of Elements
    case 'Array':
      if (!elementsIsString) elementList = elements as HTMLElement[]
      break
    // Single HTML Element
    default:
      if (elementsType.startsWith('HTML') && !elementsIsString)
        elementList = [elements as Element & HTMLElement]
  }

  // & Convert classList to array
  switch (classListType) {
    case 'String':
      if (classListIsString)
        if (classList.split(' ').length >= 2) {
          classListGroup = classList.split(' ')
        } else {
          classListGroup = [classList]
        }
      break
    case 'Array':
      if (!classListIsString) classListGroup = classList
      break
  }

  if (!elementList || elementList.length < 1)
    throw new Error(
      `Elements are invalid or undefined. elements: ${elements} → elementList: ${elementList}`,
    )

  if (!classListGroup || classListGroup.length < 1)
    throw new Error(
      `Class List is invalid or undefined. classList: ${classList} → classListGroup: ${classListGroup}`,
    )

  elementList.forEach((element) =>
    classListGroup.forEach((classItem) => {
      if (!hasClass(element, classItem)) return
      element.classList.remove(classItem)
    }),
  )
}

/**
 * ### Toggle Class
 * - Toggles the specified classes on the specified elements
 * @param {HTMLElement|HTMLElement[]|NodeList|string|undefined} elements An HTML Element, an array of HTML Elements, a Node List, a string (as a selector for a querySelector)
 * @param {string|string[]} classList A string or an array of classes to toggle on each element
 */
export function toggleClass(
  elements: HTMLElement | HTMLElement[] | NodeList | string,
  classList: string | string[],
) {
  const elementsType = elements.constructor.name,
    elementsIsString = typeof elements === 'string',
    classListType = classList.constructor.name,
    classListIsString = typeof classList === 'string'

  let elementList: HTMLElement[] | undefined,
    classListGroup: string[] | undefined

  // & Convert elements to array
  switch (elementsType) {
    // Selector
    case 'String':
      if (elementsIsString)
        elementList = Array.from(document.querySelectorAll(elements))
      break
    // Multiple HTML Elements
    case 'NodeList':
      if (!elementsIsString)
        elementList = Array.from(elements as NodeList) as HTMLElement[]
      break
    // Array of Elements
    case 'Array':
      if (!elementsIsString) elementList = elements as HTMLElement[]
      break
    // Single HTML Element
    default:
      if (elementsType.startsWith('HTML') && !elementsIsString)
        elementList = [elements as Element & HTMLElement]
  }

  // & Convert classList to array
  switch (classListType) {
    case 'String':
      if (classListIsString)
        if (classList.split(' ').length >= 2) {
          classListGroup = classList.split(' ')
        } else {
          classListGroup = [classList]
        }
      break
    case 'Array':
      if (!classListIsString) classListGroup = classList
      break
  }

  if (!elementList || elementList.length < 1)
    throw new Error(
      `Elements are invalid or undefined. elements: ${elements} → elementList: ${elementList}`,
    )

  if (!classListGroup || classListGroup.length < 1)
    throw new Error(
      `Class List is invalid or undefined. classList: ${classList} → classListGroup: ${classListGroup}`,
    )

  elementList.forEach((element) =>
    classListGroup.forEach((classItem) => {
      element.classList.toggle(classItem)
    }),
  )
}
