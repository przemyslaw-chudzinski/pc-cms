<?php

namespace App\Traits;

trait ModelTrait {

    /**
     * @param array $data
     * @param string $value
     * @return bool
     */
    public static function toggleValue(array $data, string $value)
    {
        if (!isset($data[$value])) {
            return false;
        }
        return true;
    }

    /**
     * @description use for creating new item
     * @param array $data
     * @param string $basedOn
     * @return string
     */
    public static function createSlug(array $data, string $basedOn)
    {
        if (!isset($data['slug']) || $data['slug'] === '' || empty($data['slug'] || $data['slug'] === null)) {
            return str_slug($data[$basedOn]);
        }
        return str_slug($data['slug']);
    }

    /**
     * @description use for updating item
     * @param array $data
     * @param string $basedOn
     * @return string
     */
    public static function generateSlugBasedOn(array $data, string $basedOn)
    {
        if (isset($data['generateSlug'])) {
            return str_slug($data[$basedOn]);
        } else {
            if (!isset($data['slug'])) {
                return str_slug($data[$basedOn]);
            } else {
                return str_slug($data['slug']);
            }
        }
    }

    /**
     * @param string $order_by
     * @return bool
     */
    private static function validateOrderByField($order_by = '')
    {
        if ($order_by === '') return false;
        foreach (self::$sortable as $item) {
            if ($order_by === $item) return true;
        }
        return false;
    }

    /**
     * @param int $number
     * @param array $with
     * @return mixed
     */
    private static function getModelDataWithPagination($number = 10, array $with = [], array $excluded_ids = [])
    {
        if ($number === false || $number === NULL ) {$number = 10;};
        $order_by = request()->query('order_by');
        $sort = request()->query('sort');

        if (!self::validateOrderByField($order_by)) {
            $order_by = self::$sortable[0];
            $sort = 'asc';
        }
        if (count($with) > 0) {
            return self::with($with)
                ->when($order_by, function($query) use ($order_by, $sort) {
                    return $query->orderBy($order_by, $sort);
                })
                ->when(count($excluded_ids) > 0, function ($query) use ($excluded_ids) {
                    return $query->whereNotIn('id', $excluded_ids);
                })
                ->paginate($number);
        }

        return self::
            when($order_by, function($query) use ($order_by, $sort) {
                return $query->orderBy($order_by, $sort);
            })
            ->paginate($number);
    }

    /**
     * @param $columnName
     * @param bool $activeState
     * @param bool $inactiveState
     * @return array
     */
    private function toggleModelStatus($columnName, $activeState = true, $inactiveState = false)
    {
        $data[$columnName] = $inactiveState;

        if ($this->{$columnName} == $inactiveState) {
            $data[$columnName] = $activeState;
        } else {
            $data[$columnName] = $inactiveState;
        }

        $result = $this->update($data);

        return [
            'result' => $result,
            'data' => $data
        ];
    }

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