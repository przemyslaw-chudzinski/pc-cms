<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Traits\ModelTrait;

class Menu extends Model
{

    use ModelTrait;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'published'
    ];

    protected static $sortable = [
        'name',
        'published',
        'created_at',
        'updated_at'
    ];

    public function items()
    {
        return $this->hasMany(MenuItem::class, 'menu_id');
    }

    public function parentItems()
    {
        return $this->hasMany(MenuItem::class)->whereNull('parent_id');
    }

    public function toggleStatusAjax()
    {
        $res = $this->toggleModelStatus('published');

        return response()->json([
            '7' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => $res['data']['published']
        ]);
    }

    public function getItems()
    {
        return $this
            ->parentItems()
            ->with('children')
            ->get();
    }

    public function updateTree()
    {
        $data = request()->all();
        $items = json_decode($data['items']);
        $this->orderMenu($items, null);
    }

    private function orderMenu(array $menuItems, $parentId)
    {
        foreach ($menuItems as $index => $menuItem) {
            $item = MenuItem::findOrFail($menuItem->id);
            $item->order = $index + 1;
            $item->parent_id = $parentId;
            $item->save();

            if (isset($menuItem->children)) {
                $this->orderMenu($menuItem->children, $item->id);
            }
        }
    }

    public function updateTreeAjax()
    {
        $this->updateTree();

        return response()->json([
            'type' => 'success',
            'message' => 'Menu has been updated successfully'
        ]);
    }

    public static function massActions()
    {
        $data = request()->all();
        $selected_ids = explode(',', $data['selected_values']);

        switch ($data['action_name']) {
            case 'delete':
                return self::massActionsDelete($selected_ids);
            case 'change_status_on_true':
                return self::massActionsChangeStatus($selected_ids,true);
            case 'change_status_on_false':
                return self::massActionsChangeStatus($selected_ids, false);
        }
    }
}
