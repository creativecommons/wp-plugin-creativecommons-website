<?php

function get_employees($orderBy)
{
    global $wpdb;

    $usersList = $wpdb->get_results(" SELECT * FROM " . $wpdb->users . " order by " . ($orderBy || "id"));
    $objJsonDocument = json_encode($usersList);
    return $objJsonDocument;
}


function get_users($atts)
{
    $attributes    = shortcode_atts(array('group' => NULL, 'heading' => TRUE), $atts);
    $group_name    = $attributes['group'];

    if ($group_name) {
        $groups = get_terms('group', array(
            'hide_empty' => false,
        ));

        $the_group = NULL;

        foreach ($groups as $group) {
            if ($group->slug == $group_name) {
                if ($group->count == 0) {
                    return NULL;
                } else {
                    $the_group = $group;
                    break;
                }
            }
        }
        if (!is_object($the_group)) {
            return NULL;
        }

        // The 'WP_User_Query' arguments array
        $args = array(
            'meta_key'      => 'cc_group', // Is this the meta key you are using?
            'meta_value'    => $the_group->slug, // Based on however you store your meta data
            'meta_compare'  => 'LIKE',
        );
        // The User Query
        $user_query = new WP_User_Query($args);

        return !empty($user_query->results) ? $user_query->results : [];
    }
    return [];
}
