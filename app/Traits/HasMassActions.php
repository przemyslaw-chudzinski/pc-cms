<?php

namespace App\Traits;

trait HasMassActions {
    /**
     * @param array $selected_ids
     * @param $status
     * @param string $col_name
     * @param string $message_success
     * @return \Illuminate\Http\RedirectResponse
     */
    private static function massActionsChangeStatus(array $selected_ids = [], $status, $col_name = 'published', $message_success = null, $message_error = null)
    {
        if ($message_success === null || $message_success = '' || $message_success) {
            $message_success = __('messages.mass_actions_changed_status_default_success');
        }
        if ($message_error === null || $message_error === '' || $message_error) {
            $message_error = __('messages.mass_actions_changed_status_default_error');
        }
        if(count($selected_ids) === 0) {
            return back()->with('alert', [
                'type' => 'danger',
                'message' => $message_error
            ]);
        }
        self::whereIn('id', $selected_ids)->update([
            $col_name => $status
        ]);
        return back()->with('alert', [
            'type' => 'success',
            'message' => $message_success
        ]);
    }

    /**
     * @param array $selected_ids
     * @param string $message_success
     * @param string $message_error
     * @return \Illuminate\Http\RedirectResponse
     */
    private static function massActionsDelete(array $selected_ids = [], $message_success = null, $message_error = null)
    {
        if ($message_success === null || $message_success = '' || $message_success) {
            $message_success = __('messages.mass_actions_deleted_items_default_success');
        }
        if ($message_error === null || $message_error === '' || $message_error) {
            $message_error = __('messages.mass_actions_deleted_items_default_error');
        }
        if(count($selected_ids) === 0) {
            return back()->with('alert', [
                'type' => 'danger',
                'message' => $message_error
            ]);
        }
        self::whereIn('id', $selected_ids)->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => $message_success
        ]);
    }
}