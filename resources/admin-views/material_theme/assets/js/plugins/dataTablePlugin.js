/**
 * Data table plugin
 * Author: Przemysław Chudziński
 */
(function($) {

    const $checkbox = $('.pc-selectable-input');
    const $checkboxLength = $checkbox.length;
    const $selectableRow = $('.pc-selectable-row');
    const $checkboxSelectAll = $('.pc-selectable-input-all');
    const $selectedCounter = $('.pc-selectable-counter');
    const $massActions = $('.pc-cms-mass-actions');
    const $selectedValuesInput = $('.pc-cms-selected-values-input');
    const $actionsHeader = $('#header_action_bar');
    const $actionsHeaderBackBtn = $actionsHeader.find('[data-action=close]');

    $selectedCounter.hide();
    $massActions.hide();
    $selectedValuesInput.val('');

    $checkbox.on('change', onCheckboxChangeHandler);
    $checkboxSelectAll.on('change', onCheckboxSelectAllChangeHandler);
    $actionsHeaderBackBtn.length && $actionsHeaderBackBtn.on('click', onActionsHeaderBackBtnClickHandler);

    function onActionsHeaderBackBtnClickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        closeActionsHeader();
        selectAllCheckboxes(false);
        addValueToSelectedValuesInput();
        $selectableRow.removeClass('highlight');
        $checkboxSelectAll[0].checked = false;
    }

    function onCheckboxChangeHandler(e) {
        const $target = $(e.target);
        if ($target[0].checked) {
            $target.closest('tr.pc-selectable-row').addClass('highlight');
            getLengthSelectedCheckboxes() === $checkboxLength ? $checkboxSelectAll[0].checked = true : null;
            setCounter();
        } else {
            $target.closest('tr.pc-selectable-row').removeClass('highlight');
            getLengthSelectedCheckboxes() !== $checkboxLength ? $checkboxSelectAll[0].checked = false : null;
            setCounter();
        }
        addValueToSelectedValuesInput();
    }

    function onCheckboxSelectAllChangeHandler(e){
        const $target = $(e.target);
        if ($target[0].checked) {
            $selectableRow.addClass('highlight');
            selectAllCheckboxes();
            setCounter();
        } else {
            $selectableRow.removeClass('highlight');
            selectAllCheckboxes(false);
            setCounter();
        }
        addValueToSelectedValuesInput();
    }

    const selectAllCheckboxes = (select = true) => $checkbox.prop('checked', select);

    function getLengthSelectedCheckboxes() {
        const $selectedCheckboxes = $checkbox.filter(':checked');
        return $selectedCheckboxes.length;
    }

    function setCounter(){
        const length = getLengthSelectedCheckboxes();
        if (length === 0) {
            $selectedCounter.hide();
            $massActions.hide();
            closeActionsHeader();
        } else {
            setNumberSelectedItems(length, $selectedCounter);
            setNumberSelectedItems(length, $actionsHeader.find('#selected_items span'));
            $selectedCounter.show();
            $massActions.show();
            showActionsHeader();
        }
    }

    function addValueToSelectedValuesInput() {
        $selectedValuesInput.val('');
        const $selectedCheckbox = $('.pc-selectable-input').filter(':checked');
        const selected_values = [];
        $selectedCheckbox.each((index, checkbox) => {
            const itemId = parseInt(checkbox.dataset.itemId);
            selected_values.push(itemId);
        });
        $selectedValuesInput.val(selected_values.toString());
    }

    function showActionsHeader() {
        $actionsHeader && $actionsHeader.length && $actionsHeader.addClass('open');
    }

    function closeActionsHeader() {
        $actionsHeader && $actionsHeader.length && $actionsHeader.removeClass('open');
    }

    function setNumberSelectedItems(count, $selector) {
        count === 1 ? $selector.text('1 item selected') : $selector.text(count + ' items selected');
    }

})(jQuery);
