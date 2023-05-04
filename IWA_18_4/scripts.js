import { createOrderHtml, html } from "./view.js";
import { createOrderData } from "./data.js";
/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath()
    let column = null
    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break;
        }
    }
    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}
const handleDragStart = (event) => {}
const handleDragEnd = (event) => {}
const handleHelpToggle = (event) => {
        const dialog = document.querySelector('[data-help-overlay]');
        if (dialog.hasAttribute('open')) {
            dialog.removeAttribute('open');
        } else {
            dialog.setAttribute('open', true);
        }
    };
const handleAddToggle = (event) => {
    event.target.textContent== "Add Order" ? html.add.overlay.open = true : html.add.overlay.open = false
}
const handleAddSubmit = (event) => {
    event.preventDefault()
    let order = {
        title:html.add.title.value,
        table:html.add.table.value,
        column: "ordered"
    }
    const servedDiv = document.querySelector('.grid__content[data-column="ordered"]');
    const html_order=createOrderHtml(createOrderData(order))
    html.edit.title.value = order.title
    servedDiv.appendChild(html_order)
    html.add.overlay.open = false
}
const handleEditToggle = (event) => {
    event.target.textContent== "Cancel" ? html.edit.overlay.open = false : html.edit.overlay.open = true
}
const handleEditSubmit = (event) => {
    event.preventDefault()
    let update_order = {
        title: html.edit.title,
        table: html.edit.table,
        column:html.edit.column
    }
}
const handleDelete = (event) => {}
html.add.cancel.addEventListener('click', handleAddToggle)
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)
html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)
html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)
for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}
for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}